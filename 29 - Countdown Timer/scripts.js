let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const snoozeButton = document.querySelector('.snooze__button');
const alarm = new Audio('./beep.mp3');

function timer(seconds){
    
    clearInterval(countdown);
    
    const now = Date.now();
    const then = now + seconds * 1000;

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }

        if(secondsLeft === 0){
            alarm.play();
            alarm.loop = true;
            alarm.playbackRate = 2;
            snoozeButton.classList.add('snooze-active');
        }

        displayTimeLeft(secondsLeft);
        displayEndTime(then);
    }, 1000);
}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;

    document.title = display;
    timerDisplay.textContent = display;

}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();

    endTime.textContent = `Be Back At ${hour > 12 ? hour-12: hour }:${minutes < 10 ? '0' : '' }${minutes} 
                                        ${hour > 12 ? 'PM': 'AM' }
                                        😁`;
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

function snoozeAlarm(){
    alarm.pause();
    snoozeButton.classList.remove('snooze-active');
}

buttons.forEach(button => button.addEventListener('click', startTimer));

snoozeButton.addEventListener('click', snoozeAlarm)

document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});