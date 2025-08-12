// (B9T8)^3 B9T27


import {
    PIS_first,
    PIS_second,
    PIS_last,
    consentForm,
    extraBlank,
    welcomeScreen,
    instructionScene,
    trainInstructions,
    testInstructions,
    optionalBreak,
    withdrawQuestionnaire,
    checkWithdraw,
    firstQuestionnaire,
    secondQuestionnaire,
    finalQuestionnaire,
    explanation,
    explanation2
} from '../common.js';



let labels = [];
let currentFilename = '';
let previousFilename = '';
let stimuli = [];
window.metadata = {};
let jsPsych;
window.participant_withdrew = false;

let orgstimuli;

let thisExperiment = window.experiment;


function waitForNewFileAndStartExperiment(maxAttempts = 20) {
    let attempt = 0;

    const interval = setInterval(async () => {
        if (window.new_file && window.previous_file) {
            clearInterval(interval);
            console.log("new_file is ready:", window.new_file);
            console.log("previous_file is:", window.previous_file);

            currentFilename = window.new_file;
            previousFilename = window.previous_file;

            orgstimuli = await loadStimuliFromJson(previousFilename,thisExperiment);
            labels = orgstimuli.map(item => item.label);
            stimuli = orgstimuli.map(item => item.image);

            if (stimuli.length !== 27) {
                console.warn(`Expected 27 stimuli but got ${stimuli.length}`);
            }

            startExperiment();
        } else {
            attempt++;
            if (attempt >= maxAttempts) {
                clearInterval(interval);
                console.error("Failed to detect new_file after several attempts.");
            }
        }
    }, 2000);
}

waitForNewFileAndStartExperiment();



function startExperiment() {
    jsPsych = initJsPsych({
        show_progress_bar: true,
        auto_update_progress_bar: true
    });

    const prolificID = {
        type: jsPsychSurveyText,
        questions: [
            {
                prompt: "Please enter your Prolific ID to begin:",
                required: true,
                name: 'prolific_id'
            }
        ],
        data: { section: "prolificID" },
        on_finish: (data) => {
            try {
                const prolificID = data.response.prolific_id;
                if (!prolificID || prolificID.trim() === "") {
                    throw new Error("No response or invalid response data");
                }
                console.log("Prolific ID entered:", prolificID);
                window.prolific_id = prolificID;
                jsPsych.data.addProperties({ prolific_id: prolificID });
            } catch (e) {
                console.error("Error processing Prolific ID:", e, data.response);
            }
        }
    };

    const shuffledIndices = jsPsych.randomization.shuffle([...Array(27).keys()]);
    const seen = shuffledIndices.slice(0, 9);
    const unseen = shuffledIndices.slice(9);

    console.log("finalSeen: ", seen);
    console.log("finalUnseen: ", unseen);

    const preload = {
        type: jsPsychPreload,
        images: stimuli
    };


    function trainTitle(roundTitle) {
        return {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<p style="font-size: 40px; transform: translateY(-40px);">Training Phase ${roundTitle}</p>`,
            choices: "NO_KEYS",
            trial_duration: 2000
        };
    }

    function testTitle(roundTitle){
        return{
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<p style="font-size: 40px; transform: translateY(-40px);">Test Phase ${roundTitle}</p>`,
            choices: "NO_KEYS",
            trial_duration: 2000
        };
    }


    const trainInstructions = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<p>You will now be shown sets of images again. </p>`,
        choices: "NO_KEYS",
        trial_duration: 2000
    };


    const train1 = [];
    const train2 = [];
    const train3 = [];
    const train4 = [];
    const rounds = [train1, train2, train3, train4];

    for (let round = 0; round < 4; round++) {
        const shuffle = jsPsych.randomization.shuffle([...seen]);
        const doubleSeen = [...shuffle];
        doubleSeen.forEach(index => {
            const currentIndex = index;

            rounds[round].push(
                {
                    type: jsPsychHtmlKeyboardResponse,
                    stimulus: `
                      <div style="display: flex; align-items: center; justify-content: center; gap: 130px; transform: translateY(-20px);">
                        <div style="font-size: 36px;">${labels[currentIndex]}</div>
                        <div style="width: 400px; height: 300px; display: flex; align-items: center; justify-content: center;">
                            <img src="white_placeholder.bmp" style="height: 300px;">
                        </div>
                      </div>
                    `,
                    choices: "NO_KEYS",
                    trial_duration: 1000
                },
                {
                    type: jsPsychHtmlKeyboardResponse,
                    stimulus: `
                      <div style="display: flex; align-items: center; justify-content: center; gap: 130px; transform: translateY(-20px);">
                        <div style="font-size: 36px; text-align: left;">${labels[currentIndex]}</div>
                        <div style="width: 400px; height: 300px; display: flex; align-items: center; justify-content: center;">
                            <div id="gif-container" style="width: 400px; height: 300px;"></div>
                        </div>
                      </div>
                    `,
                    choices: "NO_KEYS",
                    trial_duration: 5000,
                    on_load: () => {
                        const gifUrl = `${stimuli[currentIndex]}?t=${Date.now()}`;
                        const img = new Image();
                        img.style.height = "300px";
                        img.src = gifUrl;

                        img.onload = () => {
                            const container = document.getElementById("gif-container");
                            if (container) {
                                container.innerHTML = "";
                                container.appendChild(img);
                            }
                        };
                    }
                },
                {
                    type: jsPsychHtmlKeyboardResponse,
                    stimulus: `<div style="transform: translateY(-40px); font-size: 44px;">+</div>`,
                    choices: "NO_KEYS",
                    trial_duration: 2000
                }
            );
        });
    }




    function createFeedbackTrial() {
        return {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<div style="font-size: 45px; color: red; text-align: center;"><strong>Well done!</strong></div>`,
            choices: "NO_KEYS",
            trial_duration: 2000
        };
    }


    function createTestTrials(indices, roundName) {
        return indices.flatMap(index => {
            const testTrial = {
                type: jsPsychSurveyText,
                preamble: `<img src='${stimuli[index]}?=${Date.now()}' style="height: 300px;">`,
                questions: [
                    {
                        prompt: `Type the label that an alien would produce for this image:`,
                        required: true
                    }
                ],
  		on_load: function() {
    		document.querySelector('input[type="text"]').disabled = true;
		    setTimeout(function() {
     			 document.querySelector('input[type="text"]').disabled = false;
    		}, 2000);
 		 },
                on_finish: data => {
                    let response = "MISSING";

                    if (data.response && data.response.Q0) {
                        response = data.response.Q0;
                    } else if (data.responses) {
                        try {
                            const responseObj = JSON.parse(data.responses);
                            response = responseObj.Q0 || "MISSING";
                        } catch (err) {
                            console.warn("Parse error:", err, data.responses);
                            response = "PARSE_ERROR";
                        }
                    }

                    jsPsych.data.addDataToLastTrial({
                        index: index,
                        image: stimuli[index],
                        label: response,
                        test_round: roundName,
                        source_filename: currentFilename,
                        rt: data.rt
                    });

                }
            };
            const blankSpace = {
                type: jsPsychHtmlKeyboardResponse,
                stimulus: "",
                choices: "NO_KEYS",
                trial_duration: 500
            };

            return [testTrial, blankSpace];
        });
    }



    const test1 = createTestTrials(seen.slice(0, 4).concat(unseen.slice(0, 4)), "Round 1");
    const test2 = createTestTrials(seen.slice(4, 8).concat(unseen.slice(4, 8)), "Round 2");
    const test3 = createTestTrials(seen.slice(8).concat(seen.slice(2, 5)).concat(unseen.slice(8, 12)), "Round 3");
    const test4 = createTestTrials([...seen, ...unseen], "Round 4");


    function saveData(filename, filedata) {
        return fetch('data/save_data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `filename=${encodeURIComponent(filename)}&filedata=${encodeURIComponent(filedata)}`
        })
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    throw new Error(result.error);
                }
                console.log('Data saved successfully:', result);
                return result;
            })
            .catch(error => {
                console.error('Error saving data:', error);
                throw error;
            });
    }

    const showBlankScreen = (duration = 1000, color = 'white') => {
        document.body.innerHTML = '';
        const blankDiv = document.createElement('div');
        blankDiv.style.cssText = `
        background: ${color};
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0; left: 0;
        z-index: 9999;
    `;
        document.body.appendChild(blankDiv);
        return new Promise(resolve => setTimeout(resolve, duration));
    };



    function endSurvey() {
        const filename = window.new_file;
        const fullData = jsPsych.data.get().values();

        const cleanedData = fullData.map(trial => {
            const copy = { ...trial };
            delete copy.first_language;
            delete copy.other_languages;
            delete copy.feedback;
            delete copy.noticed_unseen;
            delete copy.words_or_pictures;
            delete copy.notes;
            return copy;
        });

        if (cleanedData.length > 0) {
            cleanedData[0] = { ...cleanedData[0], ...metadata };
        }
        const finalJson = JSON.stringify(cleanedData);

        if (window.participant_withdrew) {
            const withdrawnFilename = `${filename}_withdrawn`;

            saveData(withdrawnFilename, finalJson)
                .then(() => {
                    appendData("log", new_file + "_withdrawn" +'\n');
                    showBlankScreen().then(() => {
                        alert("You have withdrawn from the study. Thank you for your time.");
                        window.location.href = "https://assets.wonderplan.ai/kyoto.webp";
                    });
                })
                .catch(error => {
                    alert(`Error saving withdrawal: ${error.message}`);
                });
        } else {
            // const experimentData = jsPsych.data.get().json();
            saveData(filename, finalJson)
                .then(() => {
                    appendData("log", new_file + '\n');
                    if (window.confirm("The survey is now over. Thank You! Press OK to confirm completion.")) {
                        window.location.href = 'https://assets.wonderplan.ai/kyoto.webp';
                    }
                })
                .catch(error => {
                    alert(`Error saving data: ${error.message}. Please contact the experimenter.`);
                });
        }
    }


    const timeline = [
        // prolificID,
        // PIS_first,
        // PIS_second,
        // PIS_last,
        // consentForm,
        // extraBlank,
        // welcomeScreen,
        // instructionScene,
        // preload,

        // trainTitle(1),
        // ...train1,
        // testTitle(1),
        // testInstructions,
        // ...test1,
        // createFeedbackTrial(),
        // optionalBreak,
        // checkWithdraw,
        // extraBlank,

        // trainTitle(2),
        // trainInstructions,
        // ...train2,
        // testTitle(2),
        // testInstructions,
        // ...test2,
        // createFeedbackTrial(),
        // optionalBreak,
        // checkWithdraw,
        // extraBlank,

        // trainTitle(3),
        // trainInstructions,
        // ...train3,
        // testTitle(3),
        // testInstructions,
        // ...test3,
        // createFeedbackTrial(),
        // optionalBreak,
        // checkWithdraw,
        // extraBlank,

        // trainTitle(4),
        // trainInstructions,
        // ...train4,
        // testTitle(4),
        // testInstructions,
        // ...test4,
        // createFeedbackTrial(),

        firstQuestionnaire,
        secondQuestionnaire,
        finalQuestionnaire,
        explanation,
        explanation2
    ];

    jsPsych.run(timeline).then(endSurvey);
}
