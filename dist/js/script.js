$sendAnswer = document.getElementById('send-answer');

(() => {
  // 1 paso elemento del dom
  const $fetchAsync = document.getElementById('fetch-async'),
    $fragment = document.createDocumentFragment(),
    $quizContainer = document.getElementById('quiz-container');

  // 2 paso crear funcion asincrona para poder utilizar await, dentro va a estar la invocacion hacia la solicitud
  async function getData() {
    try {
      let res = await fetch('https://opentdb.com/api.php?amount=10');

      let json = await res.json();

      for (let i = 0; i < json.results.length; i++) {
        const element = json.results[i];
        const $section = document.createElement('section');
        $section.classList.add('quiz__question');
        const $sectionAnswerContent = document.createElement('section');
        $sectionAnswerContent.classList.add('section');

        $section.innerHTML = `
          <h3 class="quiz__category" id="quiz-category">${element.category}</h3>
          
          <section class="question__container" id="question-container">
        
            <h4 class="question__title" id="question__title">Question ${
              i + 1
            }</h4>
            
            <p class="question_content" id="question_content">${
              element.question
            }</p>
          </section>
      
          <section class="answer-container" id="answer-container">
            <button class="answer__btn answer-1" type="submit" >${
              element.incorrect_answers[0]
            }</button>
            <button class="answer__btn answer-2 correct-answer" id="correct-answer" type="submit">${
              element.correct_answer
            }</button>
            <button class="answer__btn answer-3" type="submit">${
              element.incorrect_answers[1]
            }</button>
            <button class="answer__btn answer-4" type="submit">${
              element.incorrect_answers[2]
            }</button>
            
          </section>
        `;
        $fragment.appendChild($section);
      }

      $quizContainer.appendChild($fragment);

      //evento click para las opciones
      let $btnAnswer = document.querySelectorAll('.answer__btn');
      let contCorrectAnswer = 0;
      $btnAnswer.forEach(element => {
        element.addEventListener('click', () => {
          element.style.backgroundColor = '#e57373';
          element.style.color = 'white';
          element.style.borderRadius = '.3rem';
          if (element.classList.contains('correct-answer')) {
            console.log('Esta es respuesta correcta');
            contCorrectAnswer++;
            console.log(
              `Total de respuestas correctas es: ${contCorrectAnswer}`,
            );
          } else {
            console.log('Esta NO es respuesta correcta');
          }
          element.parentElement.classList.add('opt-selected');
          const $answerContainer = document.getElementById('answer-container');
        });
      });

      //configuracion el boton enviar respuestas
      $sendAnswer.addEventListener('click', () => {
        Swal.fire({
          title: `Buen trabajo!!!`,
          text: `Obtuviste ${contCorrectAnswer} respuestas correctas`,
          confirmButtonText: 'Intentar nuevamente',
        }).then(result => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    } finally {
    }
    //eliminando los botones que tengan texto undefined
    const $button = document.querySelectorAll('button');
    $button.forEach(element => {
      if (element.textContent == 'undefined') {
        element.style.display = 'none';
      }
    });
  }

  // 3paso ejecucion de la funcion asincrona
  getData();
})();

//# sourceMappingURL=script.js.map