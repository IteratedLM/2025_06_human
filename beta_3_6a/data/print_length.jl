include("load_json.jl")
using .LoadJSON

function main()
    path = String(readchomp("path.txt"))
    data = load_jsons(path)

    for n in 1:10
        key = Symbol("p$n")
        if haskey(data, key)
            println("$key\t", length(data[key]))
        else
            println("$key\tMISSING")
        end
    end
end

main()
