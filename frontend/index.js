$(document).ready(function() {
    // Search by unicorn name
    $('#nameSearchButton').click(function() {
      var name = $('#nameInput').val();
      var query = { name: name };
      axios.post('http://localhost:3000/search', query)
        .then(function(response) {
          displaySearchResults(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  
    // Search by unicorn weight
    $('#weightSearchButton').click(function() {
      var lowerLimit = $('#lowerLimitInput').val();
      var higherLimit = $('#higherLimitInput').val();
      var query = { weight: { $gte: lowerLimit, $lte: higherLimit } };
      axios.post('http://localhost:3000/search', query)
        .then(function(response) {
          displaySearchResults(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  
    // Search by unicorn favorite food
    $('#foodSearchButton').click(function() {
      var appleChecked = $('#appleCheckbox').is(':checked');
      var carrotChecked = $('#carrotCheckbox').is(':checked');
      var foodList = [];
      if (appleChecked) {
        foodList.push('apple');
      }
      if (carrotChecked) {
        foodList.push('carrot');
      }
      var query = { favoriteFood: { $in: foodList } };
      axios.post('http://localhost:3000/search', query)
        .then(function(response) {
          displaySearchResults(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  
    // Filter by unicorn name and/or weight
    $('#filterButton').click(function() {
      var nameChecked = $('#nameFilterCheckbox').is(':checked');
      var weightChecked = $('#weightFilterCheckbox').is(':checked');
      var filter = {};
      if (nameChecked) {
        filter.name = 1;
      }
      if (weightChecked) {
        filter.weight = 1;
      }
      var projection = { _id: 0, ...filter };
      axios.post('http://localhost:3000/filter', projection)
        .then(function(response) {
          displaySearchResults(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  
    // Display search results
    function displaySearchResults(results) {
      var html = '';
      if (results.length > 0) {
        results.forEach(function(result) {
          html += '<div>';
          html += '<h3>' + result.name + '</h3>';
          html += '<p>Weight: ' + result.weight + '</p>';
          html += '<p>Favorite food: ' + result.favoriteFood.join(', ') + '</p>';
          html += '</div>';
        });
      } else {
        html += '<p>No results found</p>';
      }
      $('#searchResults').html(html);
    }
  });
  