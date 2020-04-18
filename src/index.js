let time = {
    "KXCV-KRNW":{
        "time_zone": "CST",
        "hour": "09:30"
    },
    "stressbuster":{
        "time_zone": "CST",
        "hour": "16:00"
    }
    "coffee&career":{
        "time_zone": "CST",
        "hour": "08:30"
    }
    "NWOrchestre":{
        "time_zone": "CST",
        "hour": "19:30"
    }
    "Dodgeball Tournament":{
        "time_zone": "CST",
        "hour": "17:00"
    }
    "Meditation":{
        "time_zone": "CST",
        "hour": "12:00"
    }
    
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
    }
    "coffee&career":{
        "Location": "Career Services, Administration Building, NWMSU, MO."
    }
    "NWOrchestre":{
        "Location": "Ron Houston Center for Performing Arts, Maryville, MO."
    }
    "Dodgeball Tournament":{
        "Location": "Student Rec Center, NWMSU, MO."
    }
    "Meditation":{
        "Location": "JW Jones Student Union, NWMSU, MO."
    }
    
    "International Coffee Hour":{
        "Location": "BD Owens Library, NWMSU, MO."
    }
}

let description = {
    "KXCV-KRNW":{
        "time_zone": "CST",
        "hour": "09:30"
    },
    "stressbuster":{
        "time_zone": "CST",
        "hour": "16:00"
    }
    "coffee&career":{
        "time_zone": "CST",
        "hour": "08:30"
    }
    "NWOrchestre":{
        "time_zone": "CST",
        "hour": "19:30"
    }
    "Dodgeball Tournament":{
        "time_zone": "CST",
        "hour": "17:00"
    }
    "Meditation":{
        "time_zone": "CST",
        "hour": "12:00"
    }
    
    "International Coffee Hour":{
        "time_zone": "CST",
        "hour": "14:30"
    }
}

let date = {
    "KXCV-KRNW":{
        "time_zone": "CST",
        "hour": "09:30"
    },
    "stressbuster":{
        "time_zone": "CST",
        "hour": "16:00"
    }
    "coffee&career":{
        "time_zone": "CST",
        "hour": "08:30"
    }
    "NWOrchestre":{
        "time_zone": "CST",
        "hour": "19:30"
    }
    "Dodgeball Tournament":{
        "time_zone": "CST",
        "hour": "17:00"
    }
    "Meditation":{
        "time_zone": "CST",
        "hour": "12:00"
    }
    
    "International Coffee Hour":{
        "time_zone": "CST",
        "hour": "14:30"
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
    if (intentName == "GetInfoIntent") {
        handleGetInfoIntent(intent, session, callback)
    } else {
         throw "Invalid intent"
    }
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