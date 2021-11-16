"use strict";

(function () {
  // 1 paso elemento del dom
  var $fetchAsync = document.getElementById('fetch-async'),
      $fragment = document.createDocumentFragment(),
      $quizContainer = document.getElementById('quiz-container'); // console.log($btnAnswer);
  // 2 paso crear funcion asincrona para poder utilizar await, dentro va a estar la invocacion hacia la solicitud

  function getData() {
    var res, json, i, element, $section, $sectionAnswerContent, $btnAnswer, $button;
    return regeneratorRuntime.async(function getData$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(fetch('https://opentdb.com/api.php?amount=10'));

          case 3:
            res = _context.sent;
            _context.next = 6;
            return regeneratorRuntime.awrap(res.json());

          case 6:
            json = _context.sent;
            console.log(res, json);

            for (i = 0; i < json.results.length; i++) {
              element = json.results[i];
              $section = document.createElement('section');
              $sectionAnswerContent = document.createElement('section');
              $sectionAnswerContent.classList.add('section');
              $section.innerHTML = "\n          <h3 class=\"quiz-category\" id=\"quiz-category\">".concat(element.category, "</h3>\n          \n          <section class=\"question-container-\" id=\"question-container\">\n        \n            <h4 class=\"question__title\" id=\"question__title\">Question ").concat(i + 1, "</h4>\n            \n            <p class=\"question_content\" id=\"question_content\">").concat(element.question, "</p>\n          </section>\n      \n          <section class=\"answer-container\">\n            <button class=\"btn-answer answer-1\" type=\"submit\" >").concat(element.incorrect_answers[0], "</button>\n            <button class=\"btn-answer answer-2 correct-answer\" id=\"correct-answer\" type=\"submit\">").concat(element.correct_answer, "</button>\n            <button class=\"btn-answer answer-3\" type=\"submit\">").concat(element.incorrect_answers[1], "</button>\n            <button class=\"btn-answer answer-4\" type=\"submit\">").concat(element.incorrect_answers[2], "</button>\n            \n          </section>\n        ");
              $fragment.appendChild($sectionnnnn);
            }

            $quizContainer.appendChild($fragment);
            $btnAnswer = document.querySelectorAll('.btn-answer');
            $btnAnswer.forEach(function (element) {
              element.addEventListener('click', function () {
                if (element.classList.contains('correct-answer')) {
                  console.log('Esta es respuesta correcta');
                } else {
                  console.log('Esta NO es respuesta correcta');
                }
              });
            });
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            console.log("Error: ".concat(_context.t0));

          case 17:
            _context.prev = 17;
            return _context.finish(17);

          case 19:
            //eliminando los botones que tengan texto undefined
            $button = document.querySelectorAll('button');
            $button.forEach(function (element) {
              if (element.textContent == 'undefined') {
                element.style.display = 'none';
              }
            });

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 14, 17, 19]]);
  } // 3paso ejecucion de la funcion asincrona


  getData();
})();