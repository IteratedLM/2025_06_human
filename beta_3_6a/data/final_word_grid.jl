include("load_json.jl")
using .LoadJSON

const COLOURS = ["red", "blue", "black"]
const COLOUR_LATEX = Dict("red" => "red", "blue" => "blue", "black" => "black")
const PARTICIPANTS = [Symbol("p$i") for i in 1:10]

function extract_info(filename::String)
    m = match(r"(\w+)_(\w+)_(\w+)\.gif", filename)
    return m === nothing ? (nothing, nothing, nothing) : (m.captures[1], m.captures[2], m.captures[3])
end

function latex_coloured(word::String, colour::String)
    return "\\textcolor{" * COLOUR_LATEX[colour] * "}{" * word * "}"
end

function build_table(participant::Symbol, entries)
    grid = Dict{Tuple{String,String}, Dict{String,String}}()

    for entry in entries
        if !(isa(entry, Dict) && haskey(entry, "response") && haskey(entry, "image")) continue end
        resp = entry["response"]
        image = entry["image"]
        if !(isa(resp, Dict) && haskey(resp, "Q0") && endswith(image, ".gif")) continue end

        shape, colour, movement = extract_info(image)
        word = resp["Q0"]
        if shape !== nothing && colour in COLOURS && movement !== nothing && isa(word, String)
            key = (movement, shape)
            grid[key] = get(grid, key, Dict{String,String}())
            grid[key][colour] = word
        end
    end

    shapes = sort(unique(k[2] for k in keys(grid)))
    moves = sort(unique(k[1] for k in keys(grid)))

    tex = []
    push!(tex, "\\begin{tabular}{|c|" * join(fill("c", length(shapes)), "|") * "|}")
    push!(tex, "\\hline")
    header = ["\\textbf{$(String(participant))}"]  # top-left cell
    append!(header, ["\\textbf{$s}" for s in shapes])
    push!(tex, join(header, " & ") * " \\\\ \\hline")

    for move in moves
        row = ["\\textbf{$move}"]
        for shape in shapes
            words = get(grid, (move, shape), Dict{String,String}())
            coloured_words = [haskey(words, c) ? latex_coloured(words[c], c) : "---" for c in COLOURS]
            cell = "\\begin{tabular}{@{}c@{}}" * join(coloured_words, " \\\\ ") * "\\end{tabular}"
            push!(row, cell)
        end
        push!(tex, join(row, " & ") * " \\\\ \\hline")
    end

    push!(tex, "\\end{tabular}")
    return join(tex, "\n")
end

function main()
    path = String(readchomp("path.txt"))
    data = load_jsons(path)

    tables = String[]
    for p in PARTICIPANTS
        if haskey(data, p)
            push!(tables, build_table(p, data[p]))
        else
            println("Missing data for $p")
        end
    end

    tex_doc = [
        "\\documentclass{article}",
        "\\usepackage[table]{xcolor}",
        "\\usepackage{geometry}",
        "\\usepackage{array}",
        "\\begin{document}"
    ]

    for table in tables
        push!(tex_doc, table)
        push!(tex_doc, "\\newpage")
    end

    push!(tex_doc, "\\end{document}")

    open("final_word_grids.tex", "w") do io
        for line in tex_doc
            println(io, line)
        end
    end
end

main()
