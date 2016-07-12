const isMeetup = /meetup.com\/([^\/]+)/;
var total = 0;

function toFormat(n) { return n > 999 ? n.toString().replace(/(\d{3})$/, '.$1') : n  }

const meetups = [].slice.call(document.querySelectorAll('a'))
                  .filter(function(link) { return isMeetup.test(link.href) || link.getAttribute('data-meetup-id') })
                  .map(function(link) {
                    var id = link.getAttribute('data-meetup-id');
                    if (!id) {
                      id = link.href.match(isMeetup)[1];
                      link.setAttribute('data-meetup-id', id);
                    } 
                    return id;
                  });
fetch('https://colombia-dev-communities.herokuapp.com/json?meetups=' + meetups.join(','))
  .then(function(req){ return req.json() })
  .then(function(resJSON){
    resJSON.meetups.forEach(function (meetup){
      const id = meetup.queryId;
      const count = document.createElement('strong');
      const parent = document.querySelector('[data-meetup-id="' + id + '"]');
      count.setAttribute('data-count', meetup.members);
      count.innerText = ' [' + toFormat(meetup.members) + ' miembros]';
      if (parent) {
        parent.appendChild(count);
      }
      total += meetup.members;
    })
    return total;
  })
  .then(total => {
    document.querySelector('#total').innerText = toFormat(total);
    document.querySelector('#total-wrapper').classList.remove('hide');

    [].forEach.call(document.querySelectorAll('h3'), function(title) {
      const count = document.createElement('small');
      const totalCity = [].reduce.call(title.parentNode.querySelectorAll('[data-count]'), (sum, node)=>{
        return sum + +node.getAttribute('data-count')
      }, 0);
      count.innerText = ' [' + toFormat(totalCity) + ' miembros]';
      title.appendChild(count);
    });
  });
