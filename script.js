let deadline = '2023-10-14';

//функция, определяющая остаток времени до дэдлайна
function getTimeRemaining(endtime) {
	let t = Date.parse(endtime) - Date.parse(new Date()), //вычисляем количество миллисекунд от установленного времени окончания до текущего времени
	seconds = Math.floor((t/1000) % 60), //вычисляем количество целых секунд
	minutes = Math.floor((t/1000/60) % 60), //вычисляем количество целых минут
	//hours = Math.floor((t/(1000*60*60))); //вычисляем количество целых часов, если не нужны дни
	hours = Math.floor((t/1000/60/60) % 24), //если нужны также дни
	days = Math.floor((t/(1000*60*60*24)));

	return {
		'total' : t,
		'hours' : hours,
		'minutes' : minutes,
		'seconds' : seconds,
		'days' : days
	};
}

//функция для динамической вставки вычисленных значений времени в верстку
function setClock(id, endtime) { 
	let timer = document.getElementById(id),
		hours = timer.querySelector('.hours'),
		minutes = timer.querySelector('.minutes'),
		seconds = timer.querySelector('.seconds'),
		days = timer.querySelector('.days'),
		timeInterval = setInterval(updateClock, 1000);

		//функция, обновляющая таймер 
		function updateClock() {
			let t = getTimeRemaining(endtime);

			//функция, добавляющая ноль, если часы/минуты/секунды менее 10.
			function addZero(num){
						if(num <= 9) {
							return '0' + num;
						} else return num;
					}

			hours.textContent = addZero(t.hours);
			minutes.textContent = addZero(t.minutes);
			seconds.textContent = addZero(t.seconds);
			days.textContent = addZero(t.days);

			//если таймер истек, отображается 00:00:00
			if (t.total <= 0) {
				clearInterval(timeInterval);
				hours.textContent = '00';
				minutes.textContent = '00';
				seconds.textContent = '00';
				days.textContent = '00';
			}
		}

	}

	setClock('timer', deadline);
