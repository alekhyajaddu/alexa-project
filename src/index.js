let time = {
    "KXCV-KRNW": {
        "time_zone": "CST",
        "hour": "09:30"
    },
    "stressbuster": {
        "time_zone": "CST",
        "hour": "16:00"
    },
    "coffee&career": {
        "time_zone": "CST",
        "hour": "08:30"
    },
    "NWOrchestra": {
        "time_zone": "CST",
        "hour": "19:30"
    },
    "Dodgeball Tournament": {
        "time_zone": "CST",
        "hour": "17:00"
    },
    "Meditation": {
        "time_zone": "CST",
        "hour": "12:00"
    },
    "International Coffee Hour": {
        "time_zone": "CST",
        "hour": "14:30"
    }
}

let venue = {
    "KXCV-KRNW": {
        "location": "KXCV-KRNW Facebook Page."
    },
    "stressbuster": {
        "location": "The Station, Maryville, MO."
    },
    "coffee&career": {
        "location": "Career Services, Administration Building, NWMSU, MO."
    },
    "NWOrchestra": {
        "location": "Ron Houston Center for Performing Arts, Maryville, MO."
    },
    "Dodgeball Tournament": {
        "location": "Student Rec Center, NWMSU, MO."
    },
    "Meditation": {
        "location": "JW Jones Student Union, NWMSU, MO."
    },
    "International Coffee Hour": {
        "location": "BD Owens Library, NWMSU, MO."
    }
}

let description = {
    "KXCV-KRNW": {
        "desc": "Individuals are invited to participate – anytime, anywhere – by clocking their times and then sending a selfie and photo of their results to helenk@nwmissouri.edu or by posting to the KXCV-KRNW Facebook page."
    },
    "stressbuster": {
        "desc": "Learn to recognize and effectively manage stress in fun, healthy ways! All students, faculty and staff are welcome."
    },
    "coffee&career": {
        "desc": "This is a come and go session focused on helping students find internships and full-time jobs. Students are welcome to attend at any stage in the search process. Career Services staff and student Career Ambassadors will be on hand to answer questions and help. Coffee and other drinks are available and free of charge for students who attend."
    },
    "NWOrchestra": {
        "desc": "The Northwest Orchestra and the Symphonic Band perform at 7:30 p.m. in the Mary Linn Auditorium at the Ron Houston Center for the Performing Arts. The concert is free and open to the public."
    },
    "Dodgeball Tournament": {
        "desc": "Campus Recreation is having a Dodgeball Tournament on April 21st in the SRC. Make sure and bring Bearcat cards to all games to check in. "
    },
    "Meditation": {
        "desc": "These sessions introduce individuals to the ancient practices of mindfulness and meditation and allow participants to engage in the practice of meditation on a regular basis. Participants are encouraged to bring a pillow or thick towel to sit on."
    },

    "International Coffee Hour": {
        "desc": "The activity provides an opportunity for students, staff and faculty to connect. Make new friends from around the globe, connect with old friends and have fun."
    }
}

let date = {
    "KXCV-KRNW": {
        "year": "2020",
        "month": "april",
        "day": "17"
    },
    "stressbuster": {
        "year": "2020",
        "month": "april",
        "day": "20"
    },
    "coffee&career": {
        "year": "2020",
        "month": "april",
        "day": "24"
    },
    "NWOrchestra": {
        "year": "2020",
        "month": "april",
        "day": "23"
    },
    "Dodgeball Tournament": {
        "year": "2020",
        "month": "april",
        "day": "21"
    },
    "Meditation": {
        "year": "2020",
        "month": "april",
        "day": "22"
    },
    "International Coffee Hour": {
        "year": "2020",
        "month": "",
        "day": "22"
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
            onSessionStarted({ requestId: event.request.requestId }, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "intentRequest") {
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
    //onIntent(intentRequest, session, callback);
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
    if (intentName == "time") {
        handleTimeResponse(intent, session, callback)
    } else if (intentName == "venue") {
        handleVenueResponse(intent, session, callback)
    } else if (intentName == "description") {
        handleDescriptionResponse(intent, session, callback)
    } else if (intentName == "date") {
        handleDateResponse(intent, session, callback)
    } else if (intentName == "AMAZON.FallbackIntent") {
        handleFallbackResponse(intent, session, callback)
    } else if (intentName == "AMAZON.CancelIntent") {
        handleFinishSessionRequest(intent, session, callback)
    } else if (intentName == "AMAZON.StopIntent") {
        handleFinishSessionRequest(intent, session, callback)
    } else if (intentName == "AMAZON.NavigateHomeIntent") {
        handleNavigateHomeResponse(intent, session, callback)
    } else {
        throw "Invalid intent"
    }
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
//function onSessionEnded(sessionEndedRequest, session) {

//}

// ------- Skill specific logic -------

function getWelcomeResponse(callback) {
    var speechOutput = "Welcome! Do you want to get some information about the following events:"
        + "KXCV-KRNW, stressbuster, coffe&career, NWOrchestra, Dodgeball Tournament, Meditation, International Coffee Hour."

    var reprompt = "Do you want to hear about some information on the events, KXCV-KRNW, stressbuster, coffe&career, NWOrchestra, Dodgeball Tournament, Meditation, International Coffee Hour.?"

    var header = "Get Info"

    var shouldEndSession = false

    var sessionAttributes = {
        "speechOutput": speechOutput,
        "repromptText": reprompt
    }

    callback(sessionAttributes, buildSpeechletResponse(header, speechOutput, reprompt, shouldEndSession))

}

function handleTimeResponse(intent, session, callback) {
    let timeinput = intent.slots.hour.value.toLowerCase()

    if (!timeinput[time]) {
        let speechOutput = "Event not listed."
        let reprompt = "Better luck next time!"
        let header = "Invalid text."
    } else {
        let time_zone = timeinput[time].time_zone
        let hour = timeinput[time].hour
        let speechOutput = time + " " + time_zone + " at " + hour
            + " Do you want to check the timings of other events listed: "
            + "KXCV-KRNW, stressbuster, coffe&career, NWOrchestra, Dodgeball Tournament, Meditation, International Coffee Hour."
        let repromptText = "Do you want more information of other event timings?"
        //  let header = capitalizeFirst(time)
    }
    let shouldEndSession = false
    callback(session.attributes, buildSpeechletResponse(header, speechOutput, repromptText, shouldEndSession))
}

function handleVenueResponse(intent, session, callback) {
    let venueinput = intent.slots.venue.value.toLowerCase()
    if (!venueinput[venue]) {
        let speechOutput = "No events available at this venue."
        let reprompt = "Better luck next time!"
        let header = "Invalid text."
    } else {
        let location = venueinput[venue].location
        let speechOutput = capitalizeFirst(venue) + " is at " + location
            + " Do you want to check the venue of other events listed: "
            + "KXCV-KRNW, stressbuster, coffe&career, NWOrchestra, Dodgeball Tournament, Meditation, International Coffee Hour."
        let repromptText = "Do you want more information of other event venues?"
        let header = capitalizeFirst(venue)
    }
    let shouldEndSession = false
    callback(session.attributes, buildSpeechletResponse(header, speechOutput, repromptText, shouldEndSession))
}

function handleDescriptionResponse(intent, session, callback) {
    let descinput = intent.slots.description.value.toLowerCase()
    if (!descinput[description]) {
        let speechOutput = "There is no description for events which are not listed."
        let reprompt = "Better luck next time!"
        let header = "Invalid text."
    } else {
        let desc = descinput[description].desc
        let speechOutput = captitalizeFirst(desc)
            + " Do you want to check the description of other events listed: "
            + "KXCV-KRNW, stressbuster, coffe&career, NWOrchestra, Dodgeball Tournament, Meditation, International Coffee Hour."
        let repromptText = "Do you want more information of other event details?"
        let header = capitalizeFirst(desc)
    }
    let shouldEndSession = false
    callback(session.attributes, buildSpeechletResponse(header, speechOutput, repromptText, shouldEndSession))
}

function handleDateResponse(intent, session, callback) {
    let dateinput = intent.slot.date.value.toLowerCase()
    if (!dateinput[date]) {
        let speechOutput = "Hey! You have no events today!"
        let reprompt = "Better luck next time!"
        let header = "Invalid text."
    } else {
        let year = dateinput[date].year
        let month = dateinput[date].month
        let day = dateinput[date].day
        let speechOutput = year + " " + month + day
            + " Do you want to check the date of other events listed: "
            + "KXCV-KRNW, stressbuster, coffe&career, NWOrchestra, Dodgeball Tournament, Meditation, International Coffee Hour."
        let repromptText = "Do you want more information of events on other days?"
        // let header = capitalizeFirst(time)
    }
    let shouldEndSession = false
    callback(session.attributes, buildSpeechletResponse(header, speechOutput, repromptText, shouldEndSession))
}

function handleFallbackResponse(intent, session, callback) {
    let speechOutput = "Hi! Are you trying to fall back? Well you are being redirected to the time intent."
    let repromptText = speechOutput
    let shouldEndSession = false

    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession))

}

function handleNavigateHomeResponse(intent, session, callback) {
    if (!session.attributes) {
        session.attributes = {};
    }

    let speechOutput = "You wanna go home? You will be redirected to the description intent."
    let repromptText = speechOutput
    let shouldEndSession = false

    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession))

}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Hey sad to see you go, hope you had a good time with this app!" if the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Hey sad to see you go, hope you had a good time with this app!", "", true));
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