window.onload=function()
{
  $(document).ready(function(){
    const playButton = $('#play-button');
    const pauseButton = $('#pause-button');
    const stopButton = $('#stop-button');
    const textInput = $('#text');
    textInput.val( localStorage.getItem("textArea")) ;
    const speedInput = $('#speed');
    let currentCharacter ;
    
    playButton.click (function(){
      playText(textInput.val())
    });
    pauseButton.click(pauseText);
    stopButton.click( stopText );
    speedInput.change(function ()  {
      stopText();
      playText(utterance.text.substring(currentCharacter));
    });

    textInput.change(function(){
      let storeText = textInput.val();
      localStorage.setItem("textArea", storeText);
    });
    
    const utterance = new SpeechSynthesisUtterance();
    utterance.addEventListener('end', function() {
      textInput.attr("disabled", false);
    })
    utterance.addEventListener('boundary', function( e ) {
      currentCharacter = e.charIndex;
    })
    
    function playText(text) {
      if (speechSynthesis.paused && speechSynthesis.speaking) {
       speechSynthesis.resume();
       return;
      }
      if (speechSynthesis.speaking)
       return;
      utterance.text = text;
      utterance.rate = speedInput.val() || 1;
      textInput.attr("disabled", true);
      speechSynthesis.speak(utterance);
    }
    
    function pauseText() {
      if (speechSynthesis.speaking)
       speechSynthesis.pause();
    }
    
    function stopText() {
      speechSynthesis.resume();
      speechSynthesis.cancel();
    }


  })

}

