include("load_json.jl")
using .LoadJSON

function main()
    path = String(readchomp("path.txt"))
    println(path)
    data = load_jsons(path)
    println(collect(keys(data)))
    
    example = data[:p9]
    
    section_counts = Dict{String, Int}()


    for (i, entry) in enumerate(example)
        if isa(entry, Dict)
            trial_type = get(entry, "trial_type", "—")
            section = get(entry, "section", "—")
            stimulus_label = "—"
            
            if haskey(entry, "stimulus") && isa(entry["stimulus"], String)
                m = match(r"<div[^>]*font-size:\s*36px[^>]*>(.*?)</div>", entry["stimulus"])
                if m !== nothing
                    stimulus_label = strip(m.captures[1])
                end
            end
            
            println("$i\t$trial_type\t$section\t$stimulus_label")
        end
    end

    
    println(example[217])
    println(example[218])
    println(example[219])

end
    
main()
