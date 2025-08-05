include("load_json.jl")
using .LoadJSON

const PARTICIPANTS = [:p1, :p2, :p3, :p4, :p5, :p6, :p7, :p8, :p9, :p10]
const QUESTIONS = [
    ("other_languages", "Do you speak any other languages?"),
    ("first_language", "What is your first language?"),
    ("noticed_unseen", "Did you notice any unseen influences or patterns?"),
    ("feedback", "Do you have any feedback?"),
    ("words_or_pictures", "Did you use words or pictures?"),
    ("notes", "Did you take any notes?")
]

function main()
    path = String(readchomp("path.txt"))
    data = load_jsons(path)

    responses = Dict(q[1] => fill("-", length(PARTICIPANTS)) for q in QUESTIONS)

    for (p_index, pkey) in enumerate(PARTICIPANTS)
        if !haskey(data, pkey)
            println("Warning: $pkey missing from data.")
            continue
        end

        vec = data[pkey]

        for entry in vec
            if !(isa(entry, Dict) && haskey(entry, "response") && isa(entry["response"], Dict))
                continue
            end

            resp = entry["response"]
            for (field, _) in QUESTIONS
                if haskey(resp, field) && responses[field][p_index] == "-"
                    responses[field][p_index] = string(resp[field])
                end
            end
        end
    end

    tex_lines = [
        "\\documentclass{article}",
        "\\usepackage[utf8]{inputenc}",
        "\\usepackage[a4paper, margin=2.5cm]{geometry}",
        "\\usepackage{titlesec}",
        "\\titleformat{\\section}{\\normalfont\\Large\\bfseries\\filcenter}{}{0pt}{}",
        "\\begin{document}"
    ]

    for (field, title) in QUESTIONS
        push!(tex_lines, "\\section*{$title}")
        answers = responses[field]
        for (i, answer) in enumerate(answers)
            clean = replace(answer, "\n" => " ")
            push!(tex_lines, "\\noindent \\textbf{Participant $i:} $clean\\\\[1ex]")
        end
        push!(tex_lines, "\\newpage")
    end

    push!(tex_lines, "\\end{document}")

    open("question_responses.tex", "w") do io
        for line in tex_lines
            println(io, line)
        end
    end
end

main()
