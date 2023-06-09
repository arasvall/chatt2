(function(){
    let element = function(id){
        return document.getElementById(id);
    }

    // Get Elements
    let status = element('status');
    let messages = element('messages');
    let textarea = element('textarea');
    let username = element('username');
    let clearBtn = element('clear');

    // Set default status
    let statusDefault = status.textContent;

    let setStatus = function(s){
        // Set status
        status.textContent = s;

        if(s !== statusDefault){
            let delay = setTimeout(function(){
                setStatus(statusDefault);
            }, 3030);
        }
    }

    // Connect to socket.io
    let socket = io.connect('http://127.0.0.1:3030');

    // Check for connection
    if(socket !== undefined){
        console.log('Connected to socket...');

        // Handle Output
        socket.on('output', function(data){
            //console.log(data);
            if(data.length){
                for(let x = 0;x < data.length;x++){
                    // Build out message div
                    let message = document.createElement('div');
                    message.setAttribute('class', 'chat-message');
                    message.textContent = data[x].name+": "+data[x].message;
                    messages.appendChild(message);
                    messages.insertBefore(message, messages.firstChild);
                }
            }
        });

        // Get Status From Server
        socket.on('status', function(data){
            // get message status
            setStatus((typeof data === 'object')? data.message : data);

            // If status is clear, clear text
            if(data.clear){
                textarea.value = '';
            }
        });

        // Handle Input
        textarea.addEventListener('keydown', function(event){
            if(event.which === 13 && event.shiftKey == false){
                // Emit to server input
                socket.emit('input', {
                    name:username.value,
                    message:textarea.value
                });

                event.preventDefault();
            }
        })

    }

})();