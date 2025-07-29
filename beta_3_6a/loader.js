async function loadStimuliFromJson(file,experiment) {
  const url = `https://choicetask.com/beta_3_6a/${experiment}/data/${file}.json`;
    console.log(url);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to load " + url);
    const data = await response.json();
    return data.filter(item =>
        item.test_round === "Round 4" &&
        item.image &&
        item.label
    );
  } catch (err) {
    console.error("Error loading .json stimuli:", err);
    return [];
  }
}
