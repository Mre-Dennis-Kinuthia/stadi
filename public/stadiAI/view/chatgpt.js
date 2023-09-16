// Replace 'YOUR_API_KEY' with your actual OpenAI API key
const apiKey = 'YOUR_API_KEY';

// Function to send a message to the chatbot
function sendMessage() {
    const userMessage = $('#user-input').val(); // Get user's message
    $('#user-input').val(''); // Clear the input field

    // Display user's message in the chat window
    $('#chat-output').append('<div class="user-message">' + userMessage + '</div>');

    // Make an API request to ChatGPT
    $.ajax({
        url: 'https://api.openai.com/v1/engines/davinci-codex/completions',
        type: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            prompt: userMessage,
            max_tokens: 50 // Adjust as needed
        }),
        success: function (response) {
            const chatMessage = response.choices[0].text;
            // Display the chatbot's response in the chat window
            $('#chat-output').append('<div class="chatbot-message">' + chatMessage + '</div>');
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}

// Attach the sendMessage function to the Send button's click event
$('#send-button').click(sendMessage);

// You can also trigger sendMessage when the user presses Enter in the input field
$('#user-input').keypress(function (e) {
    if (e.which === 13) {
        sendMessage();
    }
});
