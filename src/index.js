let time = {
    "KXCV-KRNW":{
        "time_zone": "CST",
        "hour": "09:30"
    },
    "stressbuster":{
        "time_zone": "CST",
        "hour": "16:00"
    },
    "coffee&career":{
        "time_zone": "CST",
        "hour": "08:30"
    },
    "NWOrchestra":{
        "time_zone": "CST",
        "hour": "19:30"
    },
    "Dodgeball Tournament":{
        "time_zone": "CST",
        "hour": "17:00"
    },
    "Meditation":{
        "time_zone": "CST",
        "hour": "12:00"
    },
    "International Coffee Hour":{
        "time_zone": "CST",
        "hour": "14:30"
    }
}

let venue = {
    "KXCV-KRNW":{
        "location": "KXCV-KRNW Facebook Page."
    },
    "stressbuster":{
        "Location": "The Station, Maryville, MO."
    },
    "coffee&career":{
        "Location": "Career Services, Administration Building, NWMSU, MO."
    },
    "NWOrchestra":{
        "Location": "Ron Houston Center for Performing Arts, Maryville, MO."
    },
    "Dodgeball Tournament":{
        "Location": "Student Rec Center, NWMSU, MO."
    },
    "Meditation":{
        "Location": "JW Jones Student Union, NWMSU, MO."
    },
    "International Coffee Hour":{
        "Location": "BD Owens Library, NWMSU, MO."
    }
}

let description = {
    "KXCV-KRNW":{
        "desc":"Individuals are invited to participate – anytime, anywhere – by clocking their times and then sending a selfie and photo of their results to helenk@nwmissouri.edu or by posting to the KXCV-KRNW Facebook page."
    },
    "stressbuster":{
        "desc":"Learn to recognize and effectively manage stress in fun, healthy ways! All students, faculty and staff are welcome."
    },
    "coffee&career":{
        "desc":"This is a come and go session focused on helping students find internships and full-time jobs. Students are welcome to attend at any stage in the search process. Career Services staff and student Career Ambassadors will be on hand to answer questions and help. Coffee and other drinks are available and free of charge for students who attend."
    },
    "NWOrchestra":{
        "desc":"The Northwest Orchestra and the Symphonic Band perform at 7:30 p.m. in the Mary Linn Auditorium at the Ron Houston Center for the Performing Arts. The concert is free and open to the public."
    },
    "Dodgeball Tournament":{
        "desc":"Campus Recreation is having a Dodgeball Tournament on April 21st in the SRC. Make sure and bring Bearcat cards to all games to check in. "
    },
    "Meditation":{
        "desc":"These sessions introduce individuals to the ancient practices of mindfulness and meditation and allow participants to engage in the practice of meditation on a regular basis. Participants are encouraged to bring a pillow or thick towel to sit on."
    },
    
    "International Coffee Hour":{
        "desc":"The activity provides an opportunity for students, staff and faculty to connect. Make new friends from around the globe, connect with old friends and have fun."
    }
}

let date = {
    "KXCV-KRNW":{
        "year":"2020",
        "month":"april",
        "date":"17"
    },
    "stressbuster":{
        "year":"2020",
        "month":"april",
        "date":"20"
    },
    "coffee&career":{
        "year":"2020",
        "month":"april",
        "date":"24"
    },
    "NWOrchestra":{
        "year":"2020",
        "month":"april",
        "date":"23"
    },
    "Dodgeball Tournament":{
        "year":"2020",
        "month":"april",
        "date":"21"
    },
    "Meditation":{
        "year":"2020",
        "month":"april",
        "date":"22"
    },
    "International Coffee Hour":{
        "year":"2020",
        "month":"",
        "date":""
    }
}

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

    // if (event.session.application.applicationId !== "") {
    //     context.fail("Invalid Application ID");
    //  }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    getWelcomeResponse(callback)
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {

    var intent = intentRequest.intent
    var intentName = intentRequest.intent.name;

    // dispatch custom intents to handlers here
    if(intentName == "time"){

    } else if(intentName == "venue"){

    } else if(intentName == "description"){

    } else if(intentName == "date"){

    } else if(intentName == "AMAZON.")
    //if (intentName == "GetInfoIntent") {
   //     handleGetInfoIntent(intent, session, callback)
   // } else {
    //     throw "Invalid intent"
    //}
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {

}

// ------- Skill specific logic -------

function getWelcomeResponse(callback) {
    var speechOutput = "Welcome! Do you want to get some information about the followinf events:"
    + "KXCV-KRNW, stressbuster, coffe&career, NWOrchestra, Dodgeball Tournament, Meditation, International Coffee Hour."

    var reprompt = "Do you want to hear about some information on the events, KXCV-KRNW, stressbuster, coffe&career, NWOrchestra, Dodgeball Tournament, Meditation, International Coffee Hour.?"

    var header = "Get Info"

    var shouldEndSession = false

    var sessionAttributes = {
        "speechOutput" : speechOutput,
        "repromptText" : reprompt
    }

    callback(sessionAttributes, buildSpeechletResponse(header, speechOutput, reprompt, shouldEndSession))

}

function handleGetInfoIntent(intent, session, callback) {


}


// ------- Helper functions to build responses for Alexa -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}

function capitalizeFirst(s) {
    return s.charAt(0).toUpperCase() + s.slice(1)
}