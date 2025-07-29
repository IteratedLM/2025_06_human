let allocationStarted = false;
let previous_file = null;

async function loadDatFile(filename) {
  const url = `https://choicetask.com/alien_0711/loadTest/${filename}.json`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to load " + url);
    return await response.text();
  } catch (error) {
    console.error("Error loading .json file:", error);
    return null;
  }
}


function loadLogFile() {
  return fetch('https://choicetask.com/alien_0711/loadTest/log.txt')
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch log.txt");
      }
      return response.text();
    })
    .then(text => {
      return text.trim().split(/\r?\n/);  // Split into lines
    });
}



function pickCurrentFile(lines) {
  const chainGenerations = {};

  // Step 1: Parse all valid lines
  for (const line of lines) {
	const match = line.trim().match(/^data_(\d+)_(\d+)_(\d+)$/);
    if (!match) continue;

    const chain = parseInt(match[1], 10);
    const gen = parseInt(match[2], 10);

    if (!(chain in chainGenerations) || gen > chainGenerations[chain]) {
      chainGenerations[chain] = gen;
    }
  }

  // If no valid data lines found
  if (Object.keys(chainGenerations).length === 0) {
    console.error("No valid entries in log.txt");
    return null;
  }

  // Step 2: Find minimum of max generations
  const minGen = Math.min(...Object.values(chainGenerations));
  console.log("mingen: ", minGen);

  // Step 3: Filter chains with that min generation
  const eligibleChains = Object.entries(chainGenerations)
    .filter(([_, gen]) => gen === minGen)
    .map(([chain, _]) => parseInt(chain, 10));

  console.log("elligible Chains: ", eligibleChains);

  // Step 4: Randomly pick one
  const selectedChain = eligibleChains[Math.floor(Math.random() * eligibleChains.length)];
  console.log("Selected: ", selectedChain);

  // Step 5: Find real matching lines
  const candidates = lines.filter(line =>
      line.startsWith(`data_${selectedChain}_${minGen}_`) && !line.includes('_withdrawn')
  );
  console.log("Candidates: ", candidates);

  const selectedLine = candidates[Math.floor(Math.random() * candidates.length)];
  console.log("Selected Line: ", selectedLine);

  return {
    current_file: selectedLine,  // full filename like data_2_0_1234
    chain: selectedChain,
    generation: minGen
  };
}


function bumpGeneration(current_file) {
console.log("bumpGeneration received:", current_file);
  const match = current_file.match(/^data_(\d+)_(\d+)_(\d+)$/);

  if (!match) {
    console.error("Invalid filename format:", current_file);
    return null;
  }

  const chain = match[1];
  const newGen = parseInt(match[2], 10) + 1;
  const newID = Math.floor(1000 + Math.random() * 9000); // random 4-digit number

  return `data_${chain}_${newGen}_${newID}`;
}


function saveData(filename, filedata) {
  $.ajax({
    type: 'post',
    cache: false,
    url: 'loadTest/save_data.php',
    data: { filename: filename, filedata: filedata }
  });
}

function appendData(filename, filedata) {
  $.ajax({
    type: 'post',
    cache: false,
    url: 'loadTest/append_data.php',
    data: { filename: filename, filedata: filedata }
  });
}


function endSurvey() {
  saveData("data", "done");
}	




let current_file = null;
let new_file = null;

async function initFilesAndDuplicateData() {
  if (allocationStarted) return;
  allocationStarted = true;
  const lines = await loadLogFile();
  console.log("Loaded log file:", lines);

  const result = pickCurrentFile(lines);

  if (!result) return;

  current_file = result.current_file;             // e.g. data_1_1_1234
  // previous_file = current_file;

  new_file = bumpGeneration(current_file);        // e.g. data_1_2_5678
  window.new_file = new_file;
  window.previous_file = result.current_file;
  console.log("initFilesAndDuplicateData called at", new Date().toISOString());
  console.log("current_file picked:", current_file);
  console.log("new_file to be created:", new_file);


  // appendData("log", new_file + '\n');

  // Load original .json content
  const originalData = await loadDatFile(current_file);
  if (originalData === null) return;

  // Duplicate the string
  // const newData = originalData + originalData;

  // Save to new file
  // saveData(new_file , '[]');

  console.log("Duplicated data saved to:", new_file + '.json');
}

initFilesAndDuplicateData();





