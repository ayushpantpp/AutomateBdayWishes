
const moment = require("moment");
var request = require('request');

var date = moment("2019-04-02")
var minutes = -moment().diff(date, 'minutes')
var seconds = -moment().diff(date, 'seconds')
var minutes = {
    min: minutes/60,
    text: 'hours',
    counter: 3600000
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
        console.log('here')
        return minutes = {
            min: minutes/60,
            text: 'hours',
            counter: 3600000
        }
    }
  };
})();


const refreshId = setInterval(
  () => {
    minutes = CheckReload();
    console.log(minutes.counter)
    sendMessage(minutes)
    if (minutes >= 0) {
      clearInterval(minutes);
    }
  },
  minutes.counter
);

const sendMessage = (minutes) => {
    var url = 'https://eu13.chat-api.com/instance33344/message?token=64ahf5uew72gbs2z';
    var data = {
        phone: '919457288864', // Receivers phone
        body: 'Hi Time to your Birthday is just: ' + Math.ceil(minutes.min) + ' ' + minutes.text + ' Enjoy your day!!', 
    };
    // Send a request
    request({
        url: url,
        method: "POST",
        json: data
    });
}

sendMessage(minutes)
