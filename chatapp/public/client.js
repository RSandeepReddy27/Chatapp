$(function () {
    const socket = io();
  
    $('#form').submit(function(e){
      e.preventDefault();
      const message = $('#m').val();
      socket.emit('chat message', message);
      $('#m').val('');
      return false;
    });
  
    const username = prompt("Enter your username:");
    socket.emit('join', username);
  
    socket.on('chat message', function(msg){
      const messageClass = msg.username === username ? 'sent' : 'received';
      $('#messages').append($('<li class="' + messageClass + '">').text(`${msg.username}: ${msg.message}`));
    });
  });
  