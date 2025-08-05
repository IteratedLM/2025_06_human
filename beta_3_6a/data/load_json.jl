module LoadJSON

using JSON
using Glob

export load_jsons

function load_jsons(path::String)
    json_files = filter(f -> endswith(f, ".json") && basename(f) != "data_1_0_1234.json",
                        Glob.glob(joinpath(path, "*.json")))

    data = Dict{Symbol, Any}()

    for file in json_files
        filename = basename(file)

        m = match(r"data_1_(\d+)_\d+\.json", filename)
        if m !== nothing
            key = Symbol("p$(m.captures[1])")
            data[key] = JSON.parsefile(file)
        end
    end

    return data
end

end # module
