window.addEventListener('DOMContentLoaded', function() { 
	
	//задаем дату, от которой начинается обратный отсчет
	let deadline = '2023-10-14',
	//получаем со страницы <span> с подписями к дням, часам, минутам, секундам </ы>
		secondsLabel = document.getElementById('second'),
		minutesLabel = document.getElementById('minute'),
		hoursLabel = document.getElementById('hour'),
		daysLabel = document.getElementById('day');

	//массивы с падежными формами 
	let secondsString = [
		'секунд',
		'секунда',
		'секунды'
	]

	let minutesString = [
		'минут',
		'минута',
		'минуты'
	]

	let hoursString = [
		'часов',
		'час',
		'часа'
	]

	let daysString = [
		'дней',
		'день',
		'дня'
	]


	//функция, определяющая остаток времени до дэдлайна
	//результат работы функции возвращаем и записываем их в объект 
	function getTimeRemaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()), //вычисляем количество миллисекунд от установленного времени окончания до текущего времени
		seconds = Math.floor((t/1000) % 60), //вычисляем количество целых секунд
		minutes = Math.floor((t/1000/60) % 60), //вычисляем количество целых минут
		//hours = Math.floor((t/(1000*60*60))); //вычисляем количество целых часов, если не нужны дни
		hours = Math.floor((t/1000/60/60) % 24), //если нужны также дни
		days = Math.floor((t/(1000*60*60*24)));


		//вызвываем функцию, которая динамически вставляет подписи к дням, часам, минутам, секундам в нужном падеже. 
		//Функция вызывается внутри функции getTimeRemaining и использует локальные переменные с вычисленными остатками времени. 
		//Вне функции getTimeRemaining работать не будет, т.к. переменные seconds, minutes, hours, days доступны в локальной области видимости
		timerLabelSetup (seconds, secondsString, secondsLabel);
		timerLabelSetup (minutes, minutesString, minutesLabel);
		timerLabelSetup (hours, hoursString, hoursLabel);
		timerLabelSetup (days, daysString, daysLabel);

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
			seconds = timer.querySelector('.seconds');
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
		//вызываем функцию setClock
		setClock('timer', deadline);
		
	//функция, изменяющая падеж в зависимости от конечной цифры дней-часов-минут-секунд
	//Принимает 3 аргумента:
	//timeData - секунды, минуты, часы или дни
	//stringData  - какой массив со строковыми данными падежа использовать (массив секунд, массив минут, массив часов, массив дней)

	function timerLabelSetup (timeData, stringData, labelData) {
		if (timeData == 12 || timeData == 13 || timeData == 14) {
			labelData.textContent = stringData[0];
		} else if ((timeData % 10) == 1 && timeData != 11) {
			labelData.textContent = stringData[1];
		} else if ((timeData % 10) == 2 || (timeData % 10) == 3 || (timeData % 10) == 4) {
			labelData.textContent = stringData[2];
		} else {
			labelData.textContent = stringData[0];
		};
	}
});
