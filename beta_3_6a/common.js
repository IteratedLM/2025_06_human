
const PIS_first = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="max-width: 800px; margin: auto; font-size: 16px; line-height: 1.6; text-align: left; ">
        <h3>You are invited to take part in a research study.</h3>
        <p>Before you decide your participation, please take time to read this information carefully so you understand what the study involves. If anything is unclear, or you have any questions, please contact us via details provided below. Please read the following description, and take as much time as you need to consider your participation.</p>
	
        <h3 style="margin-top: 30px; margin-bottom: 17px;">What is this study about?</h3>
          <p>The purpose of this study is to examine how people learn, remember and use language over a short period, using interactive tasks.</p>
	
        <h3 style="margin-top: 30px; margin-bottom: 17px;">What will you need to do?</h3>
        <p>Around 30 minutes of total activity for a payment of &pound;4.50</p>
        <p>You will be asked to complete language learning tasks involving an artificial language. Instructions for each task will be provided on screen during study.  
        During the task you will be shown a series of abstract moving pictures and asked to remember how these pictures are described in the artificial language. Then you will be tested, for example by showing you pictures and asking you to input a suitable description in the artificial language.</p>
        <p>Following the learning tasks, you will also be asked to complete a brief questionnaire with questions about your first language and your knowledge of other languages. We will also ask for feedback about your experience during the session. This questionnaire should take only a few additional minutes.</p>
        <p style="text-align: center; margin-top: 30px;"><i>(Press ENTER to continue)</i></p>
	`,
    choices: ["Enter"]
};

const PIS_second = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="max-width: 800px; margin: auto; font-size: 16px; line-height: 1.6; text-align: left; ">
        <p><strong>Please do not complete this experiment on a mobile phone.</strong> We recommend using a desktop computer or laptop to avoid issues that may interfere with the tasks. </p>
        <h3 style="margin-top: 25px; margin-bottom: 13px;">Eligibility</h3>
        <ul>
        <li>You should have sufficient proficiency in English to understand the study instructions.</li>
        <li>You should be able to easily distinguish between the colors red, blue, and black. Please do not proceed if you have color blindness affecting your ability to differentiate these colors.</li>
        </ul>
	
        <h3 style="margin-top: 25px; margin-bottom: 13px;">What is your reward?</h3>
        <p><strong><span style="color: red;">You will be paid &pound;4.50 for successful completion.  An additional bonus of &pound;1 will be awarded to the 
    top 20% best performing participants.</span></strong></p>
	
        <h3 style="margin-top: 25px; margin-bottom: 13px;">Do I have to take part?</h3>
        <p>Taking part in this study is entirely voluntary. You are free to withdraw at any time without giving a reason. If you choose to participate, you will be asked to provide electronic consent before starting the study. </p>
        <p>You can stop participating at any point by closing the window; however, in that case, we will not be able to offer any payment. Alternatively, a withdrawal button will appear at the end of different stages throughout the experiment. If you choose to click "withdraw", we will have access to your partial data and may provide a proportionate payment based on how much of the study you have completed.</p>
        <p>Should you wish to stop at any point, we encourage you to use the button as it helps us to track participation accurately. If you would like us to delete any data collected up to that point, please contact us via email or Prolific Messenger.</p>
        <p style="text-align: center; margin-top: 30px;"><i>(Press ENTER to continue)</i></p>
        </div>
	`,
    choices: ["Enter"]
};

const PIS_last = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="max-width: 800px; margin: auto; font-size: 16px; line-height: 1.6; text-align: left; ">
        <h3 style="margin-top: 25px; margin-bottom: 20px;">Anonymity, data sharing, and transparency</h3>
        <p>Since this is a Prolific study, we will have no way to identify you. We do collect your Prolific ID which we will use for administrative 
    tasks such as checking payments. Your Prolific ID will be deleted from our dataset within one month of the conclusion of data gathering. It will not be 
    included in any data sharing.</p>
        <p>Your data will be made openly available online after the study is completed; the data will be place in a suitable non-commercial repository such as osf.io, zenodo.org or data.bris. All data will be completely anonymised before sharing. </p>
        <p>Open data means that data are made available, free of charge, to anyone interested in the research, or who wishes to conduct their own analysis of the data. This means we will have no control over how the data are used. Other people might use it, for example, in their own research, it might be read by a machine learning algorithm. However, all data will be anonymous and therefore there will be no way to identify you.</p>
        <p>At the end of your participation, we will provide you with more detailed information about the scientific motivation and hypotheses behind this research.</p>  
        
        <h3 style="margin-top: 35px; margin-bottom: 20px;">Complaints</h3>
        <p>If you are unhappy about any aspect of this study, you can complain to the research governance team at the University of Bristol:</p>
        <p><a href="https://www.bristol.ac.uk/research-enterprise-innovation/research-governance/">https://www.bristol.ac.uk/research-enterprise-innovation/research-governance/</a><br>
        <a href="mailto:research-governance@bristol.ac.uk">research-governance@bristol.ac.uk</a></p>
        <p style="text-align: center; margin-top: 30px;"><i>(Press ENTER to continue)</i></p>
        </div>
	`,
    choices: ["Enter"]
};


const consentForm = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="max-width: 800px; margin: auto; font-size: 16px; line-height: 1.6; text-align: center;">
        <div style="margin-bottom: 20px;">
        <h2 style="margin-bottom: 40px">Consent Form</h2>
        </div>
        <p style="color: red;"><strong>
        By clicking the "I consent and continue" button below, you confirm that you agree to the following:
    </strong></p>
        
        <div style="display: inline-block; text-align: left;"> 
        <ul style="line-height: 1.8;">
        <li>I have read and understood the participant information.</li>
        <li>I consent voluntarily to be a participant in this study.</li>
        <li>I understand that I can refuse to answer questions and I can withdraw from the study at any time, without having to give a reason.</li>
        <li>I understand that taking part in the study involves viewing abstract images labelled in an artificial language and then being tested on my understanding of the artificial language.</li>
        <li>I understand that I will also be asked some simple questions about my knowledge of languages, my experience of language learning, and my experience during the study.</li>
        <li>I understand that I cannot be identified by the researchers.</li>
        <li>I agree that the data collected during my participation in the experiment can be shared as open data without any restriction on use.</li>
        <li>I know that my Prolific ID will be deleted before the data are shared; I understand that anything I write in response to questions that could 
    make me identifiable will also be deleted.</li>
        </ul>
        </div>
	`,
    choices: ["I consent and continue"],
    data: { section: "consent" },
    
};


const extraBlank = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: ``,
    choices: "NO_KEYS",
    trial_duration: 500
};

const welcomeScreen = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="max-width: 800px; margin: auto; font-size: 18px; line-height: 1.6;">
        <p><strong>Welcome to Beta&ndash;3&ndash;6a in a galaxy far, far away.</strong></p>
        </div>
        <div style="max-width: 800px; margin: auto; margin-top: 25px; margin-bottom: 40px; font-size: 18px; line-height: 1.6; text-align: left;">
        <p>We have encountered an intelligent alien life form with its own form of language. You must try to learn this language as best you can. 
        Do not worry if you feel overwhelmed&ndash;the alien knows that this is a difficult task for you to master, <strong>and that you will make mistakes</strong>. 
	It will do its best to understand everything that you say.</p>
	<p style="text-align: center; margin-top: 50px;"><i>(Press ENTER to continue)</i></p>
	</div> 
	`,
    choices: ["Enter"]
};

const instructionScene = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="max-width: 800px; margin: auto; font-size: 18px; line-height: 1.6; text-align: left;">
        <p style="margin-bottom: 30px;">You will see a series of pictures and the way in which the alien would describe those pictures. Every now and then the alien will test your knowledge of the language by showing you a picture without any description. Simply write what you think the correct description is in the input box provided.</p>
        <p style="margin-bottom: 30px;">Don\'t worry if you feel you have not yet mastered the language! The most important thing is to maintain good relations with the aliens and give it your best shot. ALWAYS GIVE AN ANSWER. That way the aliens will know you are trying. They will go out of their way to try to understand everything you say, and they are very patient.</p>
	<p>You will be given a break every 5 minutes or so. Good luck!</p>
        <p style="text-align: center; margin-top: 50px;"><i>(Press ENTER to continue)</i></p>
        </div>
        
    `,
    choices: ["Enter"]
};


const trainInstructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<p>You will now be shown sets of images again. </p>`,
    choices: "NO_KEYS",
    trial_duration: 2000
};


const testInstructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="max-width: 800px; margin: auto; font-size: 18px; line-height: 1.6; text-align: left;">
        <p>You will now see an image that may or may not be familiar to you.
        Your task is to type the word that you believe the alien would use to label this image.</p>
        <p>It is okay if you are not completely confident&ndash;just do your best to respond for each image based on what you have learned so far.
        Please provide an answer for every image you are shown.</p>
        <p style="text-align: center; margin-top: 50px;"><i>(Press ENTER to continue)</i></p>
        </div>
        `,
    choices: ["Enter"]
};


const optionalBreak = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
	<div style="max-width: 700px; margin: 40px auto; font-size: 18px; line-height: 1.6; text-align: left;">
        <p style="text-align: left;">
        You may now take a short break of up to <strong>2 minutes</strong>. You do not need to wait the full 2 minutes. Click "Continue" whenever you are ready to proceed, or "Withdraw" if you wish to stop participating.</p>
	<p>If you do not click "Continue", the experiment will automatically continue after 2 minutes.</p>
	</div>
	`,
    choices: ["Withdraw", "Continue"],
    trial_duration: 120000,
    on_finish: function(data) {
	window.participant_withdrew = (data.response === 0);
    }
    
};


const withdrawQuestionnaire = {
    type: jsPsychSurveyText,
    preamble:
    `<div style="max-width: 800px; margin: auto; text-align: center;">
        <h2 style="margin-bottom: 20px;">Questionnaire</h2>
        <div style="text-align: left;">
        <p> You have successfully withdrawn from the experiment and reached the final questionnaire. 
        Please answer the following questions about your experience. 
        Your responses will help us better understand the results.
        </p>
        </div>
        </div>`,
    questions:[
        {
            prompt: "<p style=\"max-width: 800px; margin: auto; font-size: 18px; line-height: 1.6; text-align: center;\"> 1. What was your main reason of withdrawing the experiment? Please specify.</p>",
            required: false,
            rows: 3,
            columns:80,
            name: 'withdraw_reason'
        }
    ],
    data: { section: "withdraw_questionnaire" },
    on_finish: (data) => {
        try {
            const responses = data.response || {};
            jsPsych.data.addDataToLastTrial({
                reason: responses.withdraw_reason || "",
                section: "withdraw_questionnaire"
                });
            console.log("withdraw questionnaire responses saved:", responses);
	    
	    
            window._withdraw_early_exit = true;
            endSurvey();
        } catch (e) {
            console.error("Failed to save withdraw questionnaire responses:", e, data.response);
            window._withdraw_early_exit = true;
            endSurvey();
        }
    }
};


const firstQuestionnaire = {
    type: jsPsychSurveyText,
    preamble:
    `<div style="max-width: 800px; margin: auto; text-align: center;">
        <h2 style="margin-bottom: 20px;">Questionnaire</h2>
        <div style="text-align: left;">
        <p>
        You have now completed the experiment and reached the final questionnaire.
        Please answer the following questions about your background and your experience in this study.
        Your responses will help us better understand the results.
        </p>
        </div>
              </div>
        `,
    questions: [
        {
            prompt: "<p style=\"max-width: 800px; margin: auto; text-align: center;\">1. What is your first language?</p>",
            required: false,
            rows: 2,
            columns:80,
            name: 'first_language'
        },
        {
            prompt: "<p style=\"max-width: 800px; margin: auto; text-align: center;\">2. Have you ever learned any other languages? Please briefly describe.</p>",
            required: false,
            rows: 4,
            columns: 80,
                name: 'other_languages'
        }
    ],
    data: { section: "post-questionnaire" },
    on_finish: (data) => {
        try {
            const responses = data.response;
            metadata.first_language = responses.first_language;
            metadata.other_languages = responses.other_languages;
            console.log("first questionnaire responses saved:", responses);
        } catch (e) {
            console.error("Failed to save final questionnaire responses:", e, data.response);
        }
    }
};

const secondQuestionnaire = {
    type: jsPsychSurveyText,
    questions: [
        {
            prompt: "<p style=\"max-width: 800px; margin: auto; text-align: center;\">3. What are your thoughts on this study overall?</p>",
            required: false,
            rows: 4,
            columns: 80,
            name: 'feedback'
        },
        {
            prompt: "<p style=\"max-width: 800px; margin: auto; text-align: center;\">4. Did you notice that some test images were not shown to you during training?</p>",
            required: false,
            rows: 4,
            columns: 80,
            name: 'noticed_unseen'
        }
        ],
    data: { section: "post-questionnaire" },
    on_finish: (data) => {
        try {
            const responses = data.response;

            metadata.feedback = responses.feedback;
            metadata.noticed_unseen = responses.noticed_unseen;
	    
            console.log("Second questionnaire responses saved:", responses);
        } catch (e) {
            console.error("Failed to save final questionnaire responses:", e, data.response);
        }
        }
};


const finalQuestionnaire = {
    type: jsPsychSurveyText,
    questions: [
        {
            prompt: "<p style=\"max-width: 800px; margin: auto; text-align: center;\">5. How do thoughts usually come to you? Do you tend to think more in words, in images, or in some other way? Please specify.</p>",
            required: false,
            rows: 5,
                columns: 80,
            name: 'words_or_pictures'
        },
            {
                prompt: "<p style=\"max-width: 725px; margin: auto; text-align: left;\">6. Please describe any tricks such as mental strategies or written notes you used to assist your memory during the experiment. Do not worry about the answer; your answer will not affect your payment or any potential bonus. Your answer will help us improve our study</p>",
                required: false,
                rows: 6,
                columns: 80,
                name: 'notes'
            }
    ],
    data: { section: "post-questionnaire" },
    on_finish: (data) => {
        try {
            const responses = data.response;
	    
            metadata.words_or_pictures = responses.words_or_pictures;
            metadata.notes = responses.notes;

	    
            console.log("Final questionnaire responses saved:", responses);
        } catch (e) {
            console.error("Failed to save final questionnaire responses:", e, data.response);
        }
    }
};

const explanation = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="max-width: 800px; margin: auto; font-size: 18px; line-height: 1.6; text-align: left;">
        <h3>Thank you for taking part in this study!</h3>
        <p>This experiment is part of a line of research investigating how language evolves over time. It is a simplified, controlled replication of a 
    laboratory experiment originally conducted by Simon Kirby, Hannah Cornish, and Kenny Smith. The key idea behind this research is that languages are not just 
    handed down as fixed systems, but instead, are constantly being reshaped through learning and use. When a person learns a language, they do not just memorise a perfect copy of what they hear; they interpret patterns, generalise from examples, and sometimes introduce new structures or words. These small changes can accumulate across generations of learners.</p>
        <p>In this study, you were asked to learn an artificial language for a set of abstract animations that varied in shape, colour, and motion. You saw some of these examples during training, then were asked to label both familiar and unfamiliar images during testing. Your responses may be used to train the next participant, just as your training may have been based on a previous participant&apos;s responses. This process is known as an iterated learning model; it simulates how language is transmitted from one generation to the next.</p>
        <p>Over multiple generations, what we expect to observe is some simplification and regularisation of the language as it changes; for example, the introduction of more consistent patterns for certain colours or shapes even if there was no deliberate intention to alter the language in that way. This helps us understand how languages in the real world may have become compositional and easier to learn over time.</p>
	
    </div>
        `,
    choices: ["Continue"]
};


const explanation2 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
        <div style="max-width: 800px; margin: auto; font-size: 18px; line-height: 1.6; text-align: left;">
        <p>The hypothesis being tested in this study is that the biases that a sequence of people bring to the task of learning and reproducing an 
    artificial language will gradually shape the language to become more structured, even though the people are not deliberately intending to do so. In the 
    original study, this process led to the emergence of languages that resembled natural language in their systematic use of language components, for example 
    consistently using syllables to convey shape, colour, and motion. If you are interested and would like to know more, you can read more about this kind of work by viewing the original study: <a href="https://www.pnas.org/doi/10.1073/pnas.0707835105"> Cumulative cultural evolution in the laboratory: An experimental approach to the origins of structure in human language</a></p>
        <p>Thank you again for your time and contribution to this research. If you are unhappy about any aspect of this study, you can complain to the research governance team at the University of Bristol:  </p>
        <p><a href="https://www.bristol.ac.uk/research-enterprise-innovation/research-governance/">https://www.bristol.ac.uk/research-enterprise-innovation/research-governance/</a><br>
        <a href="mailto:research-governance@bristol.ac.uk">research-governance@bristol.ac.uk</a></p></p>
        </div>
        `,
    choices: ["Finish Experiment"]
};

export {
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
};
