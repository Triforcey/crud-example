function updatePotato(id) {
  var name = document.getElementById(id + '-name').value;
  var size = document.getElementById(id + '-size').value;
  var req = new Request('/potato');
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  var init = {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({
      _id: id,
      name: name,
      size: size
    })
  };
  fetch(req, init).then(function (res) {
    console.log(res.status);
    if (res.status.toString()[0] != 2) alert('That ain\'t valid.');
  }).catch(function (err) {
    throw err;
  });
}

function deletePotato(id) {
  var req = new Request('/potato');
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  var init = {
    method: 'DELETE',
    headers: headers,
    body: JSON.stringify({
      _id: id
    })
  };
  fetch(req, init).then(function (res) {
    if (res.status.toString()[0] != 2) return;
    document.getElementById(id).remove();
  }).catch(function (err) {
    throw err;
  });
}
