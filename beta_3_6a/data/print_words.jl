include("load_json.jl")
using .LoadJSON

function main()
    path = String(readchomp("path.txt"))
    data = load_jsons(path)

    key = :p9  #
    if !haskey(data, key)
        println("Key $key not found in data.")
        return
    end

    pvec = data[key]

    
    for i in 162:2:214  # only odd numbers
        if i <= length(pvec) && isa(pvec[i], Dict)
            entry = pvec[i]
            q0 = "-"
            if haskey(entry, "response") && isa(entry["response"], Dict) && haskey(entry["response"], "Q0")
                q0 = entry["response"]["Q0"]
            end

            img = get(entry, "image", "-")

            println("$i\t$q0\t$img")
        end
    end
end

main()
