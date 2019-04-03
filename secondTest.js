
const moment = require("moment"); // Library for date manipulation
var request = require('request'); // Library for sending API request

var date = moment("2019-04-04") //date on which birthday is.
var minutes = -moment().diff(date, 'minutes')
var seconds = -moment().diff(date, 'seconds')
var minutes = {
    min: minutes/60,
    text: 'hours',
    counter: 900
}
const CheckReload = (() => {
  return () => {
    minutes = -moment().diff(date, 'minutes')
    seconds = -moment().diff(date, 'seconds')
    if(seconds <= 10){
        return minutes = {
            min: seconds,
            text: 'seconds',
            counter: 1000
        }
    } else if(minutes <= 60){
        return minutes = {
            min: minutes,
            text: 'minutes',
            counter: 900000
        }
    } else {
        return minutes = {
            min: minutes/60,
            text: 'hours',
            counter: 3600000
        }
    }
  };
})();


let timerId = setTimeout(function request() {

    minutes = CheckReload();
    timerId = setTimeout(request, minutes.counter);
    if(minutes.min == 0) {
      sendMessageLast()
    }
    console.log(minutes.counter)
    sendMessage(minutes)
    if (minutes >= 0) {
      clearInterval(minutes);
    }
    // New condition added so it dont break was not there eairler.
        if (minutes.min < 0) {
      console.log('is exiting');
      return process.exit(22);
    }
  },
  minutes.counter
);
// Please get your instance and token from following Site https://app.chat-api.com this provide you api to use Whatsapp and other messaging services.
const sendMessage = (minutes) => {
    var url = 'https://eu13.chat-api.com/instanceID/message?token=tokenYouGetFromChatAPI';
    var data = {
        phone: '//enter the phone no you want to send to', // Receivers phone
        body: 'Hi Time to your Birthday is just: ' + Math.ceil(minutes.min) + ' ' + minutes.text + ' Enjoy your day!!', 
    };
    // Send a request
    request({
        url: url,
        method: "POST",
        json: data
    });
}
const sendMessageLast = () => {
    var url = 'https://eu13.chat-api.com/instanceID/message?token=tokenYouGetFromChatAPI';
    var data = {
        phone: '//enter the phone no you want to send to', // Receivers phone
        body: 'Happy Birthday To You !!!!!', 
    };
    // Send a request
    request({
        url: url,
        method: "POST",
        json: data
    });
}
sendMessage(minutes)
