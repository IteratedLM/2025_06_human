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
    firstQuestionnaire,
    secondQuestionnaire,
    finalQuestionnaire,
    explanation,
    explanation2
} from '../common.js';



let allocationStarted = false;
let previous_file = null;

let labels = [];
let currentFilename = '';
let previousFilename = '';
let stimuli = [];
let metadata = {};
let jsPsych;


let orgstimuli;

window.participant_withdrew = false;

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




async function startExperiment() {
    let completedTrials = 0;
    let totalTrials = 0;

    jsPsych = initJsPsych({
        show_progress_bar: false,
        auto_update_progress_bar: false,
        on_trial_finish: function () {
            completedTrials++;
            updateProgress(completedTrials, totalTrials);
        }
    });

    document.querySelector('#jspsych-progressbar-container')?.remove();

    function updateProgress(current, total) {
        let progressBar = document.querySelector("#jspsych-progressbar-inner");

        if (!progressBar) {
            const container = document.createElement('div');
            container.id = 'jspsych-progressbar-container';
            container.style.width = '100%';
            container.style.backgroundColor = '#ddd';
            container.style.margin = '10px 0';
            container.style.position = 'fixed';  // <-- so it's persistent
            container.style.top = '0';
            container.style.left = '0';
            container.style.zIndex = '9999';

            progressBar = document.createElement('div');
            progressBar.id = 'jspsych-progressbar-inner';
            progressBar.style.height = '10px';
            progressBar.style.width = '0%';
            progressBar.style.backgroundColor = '#4CAF50';

            container.appendChild(progressBar);
            document.body.appendChild(container); // append at very end instead of insertBefore
        }

        const percentage = Math.min((current / total) * 100, 100);
        progressBar.style.width = `${percentage}%`;
    }


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




    // async function safeRun(timeline) {
    //     document.querySelectorAll('.jspsych-content-wrapper, #jspsych-progressbar-container').forEach(el => el.remove());
    //
    //     return await jsPsych.run(timeline);
    // }

    async function safeRun(timeline) {
        // Remove only jsPsych content; DO NOT remove progress bar
        document.querySelectorAll('.jspsych-content-wrapper, #jspsych-target').forEach(el => el.remove());

        return await jsPsych.run(timeline);
    }


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

    // function reflectionTitle(roundTitle){
    //     return{
    //         type: jsPsychHtmlKeyboardResponse,
    //         stimulus: `<p style="font-size: 40px; transform: translateY(-40px);">Reflection Phase ${roundTitle}</p>`,
    //         choices: "NO_KEYS",
    //         trial_duration: 2000
    //     };
    // }


    const repeatedTestInstructions = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus:`
                 <div style="max-width: 800px; margin: auto; font-size: 18px; line-height: 1.6; text-align: left;">
                    <p>You will now be shown an image. Ty
                    Your task is to type the word that you believe the alien would use to label this image.</p>
                   <p style="text-align: center; margin-top: 50px;"><i>(Press ENTER to continue)</i></p>
                 </div>
                   `,
    }


    const reflectionInstruction = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
        <div style="max-width: 800px; margin: auto; font-size: 18px; line-height: 1.6; text-align: left;">
          <p style="margin-bottom: 30px;">You will now be presented with pairs of images, each labelled with the words you provided in the previous stage. Click the image that corresponds the displayed label.</p>
          <p style="text-align: center; margin-top: 50px;"><i>(Press ENTER to continue)</i></p>
        </div>      
        `,
        choices: ["Enter"]
    };


    const train1 = [];
    const train2 = [];
    const train3 = [];
    const train4 = [];
    const rounds = [train1, train2, train3, train4];

    for (let round = 0; round < 4; round++) {
        const shuffle = jsPsych.randomization.shuffle([...seen]);
        shuffle.forEach(index => {
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
                    },
                    on_start: function() {
                        completedTrials++;
                        updateProgress(completedTrials, totalTrials);
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



    const [test1Indices, test2Indices, test3Indices, test4Indices] = [
        seen.slice(0, 2).concat(unseen.slice(0, 2)),
        seen.slice(2, 4).concat(unseen.slice(2, 4)),
        seen.slice(4, 6).concat(unseen.slice(4, 6)),
        [...seen, ...unseen]
    ].map(block => jsPsych.randomization.shuffle(block));


    const refPhase1 = test1Indices.map(idx => [idx]);
    const refPhase2 = [
        test2Indices.slice(0, 2),
        test2Indices.slice(2, 4),
    ];
    const refPhase3 = [
        test3Indices.slice(0, 4)
    ];



    const test1 = createTestTrials(refPhase1, "Round 1");
    const test2 = createTestTrials(refPhase2, "Round 2");
    const test3 = createTestTrials(refPhase3, "Round 3");
    const test4 = createTestTrials(test4Indices, "Round 4");




    function getFeatures(image){
        const name = image.replace("../animations/", "").replace(".gif", "");
        const [shape, colour, motion] = name.split("_");
        return { shape, colour, motion};
    }


    function createReflectionTrial(word, target, distractor, roundName) {
        const images = jsPsych.randomization.shuffle([target, distractor]);
        const timestamp = Date.now();
        const image0 = `${images[0]}?t=${timestamp}`;
        const image1 = `${images[1]}?t=${timestamp}`;

        const reflection = `
            <div style="text-align: center;">
                <p>You previously used the word "<strong>${word}</strong>" for one of these images. Which one do you think it was?</p>
                <div style="display: flex; justify-content: center; gap: 50px; margin-top: 20px; margin-bottom: 45px;">
                    <img src="${image0}" data-choice="0" style="cursor:pointer; height: 300px; border: 4px solid transparent;" />
                    <img src="${image1}" data-choice="1" style="cursor:pointer; height: 300px; border: 4px solid transparent;" />
                </div>
            </div>
            `;

        // await jsPsych.pluginAPI.preloadImages([ image0, image1 ]);

        const reflectionTimeline = [
            {
                type: jsPsychPreload,
                images: [image0, image1]
            },
            {
                type: jsPsychHtmlKeyboardResponse,
                stimulus: reflection,
                choices: "NO_KEYS",
                on_load: function () {
                    const imgs = document.querySelectorAll('img[data-choice]');
                    imgs.forEach(img => {
                        img.style.cursor = "pointer";
                        img.addEventListener('click', function () {
                            const choice = parseInt(this.getAttribute('data-choice'));
                            jsPsych.finishTrial({
                                choice: choice,
                                selected_image: images[choice],
                                correct_answer: target,
                                was_correct: images[choice] === target,
                                reflection_round: roundName,
                                word: word
                            });
                        });
                    });
                }
            },
            {
                type: jsPsychHtmlKeyboardResponse,
                stimulus: ``,
                choices: "NO_KEYS",
                trial_duration: 1500
            }
        ];

        return {
            timeline: reflectionTimeline
        };
    }



    function generateReflectionTrials(testResponses) {
        console.log("Entered generateReflectionTrials")
        const reflectionTrials = [];
        const shapes = ["square", "triangle", "cross"];
        const colours = ["red", "blue", "black"];
        const motions = ["move", "spin", "bounce"];

        testResponses.forEach(trial => {
            const { image, label } = trial;
            if (!image || !label) return;
            const { shape, colour, motion } = getFeatures(image);
            console.log("getFeatureS: ", {shape, colour, motion});

            const distractorFeature = jsPsych.randomization.sampleWithoutReplacement(["shape", "colour", "motion"], 1)[0];
            console.log("discractor feature: " , distractorFeature);
            let distractorShape = shape;
            let distractorColour = colour;
            let distractorMotion = motion;

            if (distractorFeature === "shape") {
                const others = shapes.filter(s => s !== shape);
                distractorShape = jsPsych.randomization.sampleWithoutReplacement(others, 1)[0];
            } else if (distractorFeature === "colour") {
                const others = colours.filter(c => c !== colour);
                distractorColour = jsPsych.randomization.sampleWithoutReplacement(others, 1)[0];
            } else if (distractorFeature === "motion") {
                const others = motions.filter(m => m !== motion);
                distractorMotion = jsPsych.randomization.sampleWithoutReplacement(others, 1)[0];
            }

            const distractor = `../animations/${distractorShape}_${distractorColour}_${distractorMotion}.gif`;
            console.log("distractor: ", distractor);

            reflectionTrials.push(createReflectionTrial(label, image, distractor));
        });

        return reflectionTrials;
    }


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

    const reflectionSummary = {
        type: jsPsychCallFunction,
        func: function () {
            const reflectionResponses = jsPsych.data.get().filter(trial => trial.hasOwnProperty("reflection_round")).values();

            metadata.reflection_summary = {
                total: reflectionResponses.length,
                correct: reflectionResponses.filter(r => r.was_correct).length,
                details: reflectionResponses.map(r => ({
                    word: r.word,
                    correct: r.correct_answer,
                    selected: r.selected_image,
                    was_correct: r.was_correct
                }))
            };

            console.log("Reflection summary stored in metadata:", metadata.reflection_summary);
        }
    };



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

    totalTrials = train1.length + test1.length
        + train2.length + test2.length * 3
        + train3.length + test3.length * 3
        + train4.length + test4.length * 3 + 21;

    // if (reflection1.length) totalTrials += reflection1.length;
    // if (reflection2.length) totalTrials += reflection2.length;
    // if (reflection3.length) totalTrials += reflection3.length;

    console.log("total length: " , totalTrials);

    await safeRun([
        prolificID,
        PIS_first, PIS_second, PIS_last,
        consentForm, extraBlank,
        welcomeScreen, instructionScene,
        preload,

        trainTitle(1),
        ...train1,

        testTitle(1),
        testInstructions,
    ]);

    for (let i = 0; i < refPhase1.length; i++) {
        const block    = refPhase1[i];
        const subLabel = `Round 1.${i + 1}`;

        await safeRun([
            // testInstructions,
            ...createTestTrials(block, subLabel)
        ]);

        const responses = jsPsych.data.get()
            .filter({ test_round: subLabel })
            .filter(t => t.label && t.label !== "MISSING")
            .values();

        const reflectionTrials = generateReflectionTrials(responses, subLabel);

        await safeRun([
            // reflectionTitle(subLabel),
            reflectionInstruction,
            ...reflectionTrials
        ]);
    }

    const phase2 = [optionalBreak, checkWithdraw, extraBlank, trainTitle(2), trainInstructions, ...train2, testTitle(2), testInstructions];
    await safeRun(phase2);

    for (let i = 0; i < refPhase2.length; i++) {
        const block    = refPhase2[i];
        const subLabel = `Round 2${i + 1}`;

        await safeRun([
            ...createTestTrials(block, subLabel)
        ]);

        const responses = jsPsych.data.get()
            .filter({ test_round: subLabel })
            .filter(t => t.label && t.label !== "MISSING")
            .values();

        const reflectionTrials = generateReflectionTrials(responses, subLabel);

        await safeRun([
            // reflectionTitle(subLabel),
            reflectionInstruction,
            ...reflectionTrials
        ]);
    }


    const phase3 = [
        optionalBreak,
        checkWithdraw,
        extraBlank,
        trainTitle(3),
        trainInstructions,
        ...train3,

        testTitle(3),
        testInstructions,
    ];

    await safeRun(phase3);

    for (let i = 0; i < refPhase3.length; i++) {
        const block    = refPhase3[i];
        const subLabel = `Round 3${i + 1}`;

        await safeRun([
            ...createTestTrials(block, subLabel)
        ]);

        const responses = jsPsych.data.get()
            .filter({ test_round: subLabel })
            .filter(t => t.label && t.label !== "MISSING")
            .values();

        const reflectionTrials = generateReflectionTrials(responses, subLabel);

        await safeRun([
            // reflectionTitle(subLabel),
            reflectionInstruction,
            ...reflectionTrials
        ]);
    }


    await safeRun([
        optionalBreak, checkWithdraw, extraBlank,
        trainTitle(4), trainInstructions, ...train4,
        testTitle(4), testInstructions, ...test4,
        firstQuestionnaire, secondQuestionnaire, finalQuestionnaire,
        explanation, explanation2
    ]);

    endSurvey();


}
