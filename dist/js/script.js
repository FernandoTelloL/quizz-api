(() => {
  // 1 paso elemento del dom
  const $fetchAsync = document.getElementById('fetch-async'),
    $fragment = document.createDocumentFragment(),
    $quizContainer = document.getElementById('quiz-container');

  // console.log($btnAnswer);

  // 2 paso crear funcion asincrona para poder utilizar await, dentro va a estar la invocacion hacia la solicitud
  async function getData() {
    try {
      let res = await fetch('https://opentdb.com/api.php?amount=10');

      let json = await res.json();
      console.log(res, json);

      for (let i = 0; i < json.results.length; i++) {
        const element = json.results[i];
        const $section = document.createElement('section');
        const $sectionAnswerContent = document.createElement('section');
        $sectionAnswerContent.classList.add('section');

        $section.innerHTML = `
          <h3 class="quiz-category" id="quiz-category">${element.category}</h3>
          
          <section class="question-container-" id="question-container">
        
            <h4 class="question__title" id="question__title">Question ${
              i + 1
            }</h4>
            
            <p class="question_content" id="question_content">${
              element.question
            }</p>
          </section>
      
          <section class="answer-container">
            <button class="btn-answer answer-1" type="submit" >${
              element.incorrect_answers[0]
            }</button>
            <button class="btn-answer answer-2 correct-answer" id="correct-answer" type="submit">${
              element.correct_answer
            }</button>
            <button class="btn-answer answer-3" type="submit">${
              element.incorrect_answers[1]
            }</button>
            <button class="btn-answer answer-4" type="submit">${
              element.incorrect_answers[2]
            }</button>
            
          </section>
        `;
        $fragment.appendChild($sectionnnnn);
      }

      $quizContainer.appendChild($fragment);
      let $btnAnswer = document.querySelectorAll('.btn-answer');
      $btnAnswer.forEach(element => {
        element.addEventListener('click', () => {
          if (element.classList.contains('correct-answer')) {
            console.log('Esta es respuesta correcta');
          } else {
            console.log('Esta NO es respuesta correcta');
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
