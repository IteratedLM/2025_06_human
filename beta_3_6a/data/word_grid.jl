include("load_json.jl")
using .LoadJSON

const COLOURS = ["red", "blue", "black"]
const COLOUR_LATEX = Dict("red"=>"red", "blue"=>"blue", "black"=>"black")

function extract_info(filename::String)
    m = match(r"(\w+)_(\w+)_(\w+)\.gif", filename)
    return m === nothing ? (nothing, nothing, nothing) : (m.captures[1], m.captures[2], m.captures[3])
end

function latex_coloured(word::String, colour::String)
    return "\\textcolor{" * COLOUR_LATEX[colour] * "}{" * word * "}"
end

function main()
    path = String(readchomp("path.txt"))
    data = load_jsons(path)

    key = :p9
    if !haskey(data, key)
        println("Key $key not found.")
        return
    end

    pvec = data[key]
    grid = Dict{Tuple{String,String}, Dict{String,String}}()

    for entry in pvec
        if !(isa(entry, Dict) && haskey(entry, "image") && haskey(entry, "response")) continue end

        shape, colour, movement = extract_info(entry["image"])
        word = get(entry["response"], "Q0", nothing)

        if shape !== nothing && colour in COLOURS && movement !== nothing && isa(word, String)
            key = (movement, shape)
            grid[key] = get(grid, key, Dict{String,String}())
            grid[key][colour] = word
        end
    end

    shapes = sort(unique(k[2] for k in keys(grid)))
    moves  = sort(unique(k[1] for k in keys(grid)))

    col_spec = ">{\\raggedright\\arraybackslash}p{3cm} | " * join(["p{4cm}" for _ in shapes], " | ")

    tex_lines = [
        "\\documentclass{article}",
        "\\usepackage[table]{xcolor}",
        "\\usepackage{colortbl}",
        "\\usepackage{geometry}",
        "\\usepackage{array}",
        "\\begin{document}",
        "\\renewcommand{\\arraystretch}{1.5}",
        "\\begin{tabular}{" * col_spec * "}",
        "\\hline",
        "\\textbf{Movement \\textbackslash{} Shape} & " * join(["\\textbf{$s}" for s in shapes], " & ") * " \\\\ \\hline"
    ]

    for move in moves
        row = ["\\textbf{$move}"]
        for shape in shapes
            words = get(grid, (move, shape), Dict{String,String}())
            coloured_words = [haskey(words, c) ? latex_coloured(words[c], c) : "---" for c in COLOURS]
            cell = join(coloured_words, " ")
            push!(row, cell)
        end
        push!(tex_lines, join(row, " & ") * " \\\\ \\hline")
    end

    push!(tex_lines, "\\end{tabular}")
    push!(tex_lines, "\\end{document}")

    open("word_grid.tex", "w") do io
        for line in tex_lines
            println(io, line)
        end
    end
end

main()
