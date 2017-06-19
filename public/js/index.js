var socket=io();
var select= jQuery('#roomsList');

socket.on('updateRoomList',function(rooms){
    rooms.forEach(function(room){
        select.append(jQuery('<option></option>').text(room));
    });

    if(select.children().length > 1){
        jQuery("#select-room").removeClass('select-hide');
    }

});

select.on('change', function() {
    let room = jQuery(this).find('option:selected').val();

    if (room !== 'Select a room') {
        jQuery('input[name=room]').val(room);
    }
});
