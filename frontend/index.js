console.log('setup');
const setup = async () => {
    let filter = {
        name: false,
        weight: false
    };

    // Event listener for the filter button
    $('#filterButton').click(async () => {
        // Check which checkboxes are checked
        const nameChecked = $('#nameFilterCheckbox').is(':checked');
        const weightChecked = $('#weightFilterCheckbox').is(':checked');

        // Update the filter object based on the checkboxes
        if (nameChecked && weightChecked) {
            filter = {
                name: true,
                weight: true
            };
        } else if (nameChecked) {
            filter = {
                name: true,
                weight: false
            };
        } else if (weightChecked) {
            filter = {
                name: false,
                weight: true
            };
        }
        else {
            filter = {
                name: false,
                weight: false
            };
        // Log the filter object for testing purposes
        console.log(filter);
        }
    });

    $('#nameSearchButton').click(async () => {
        const query = {
            type: 'nameSearch',
            filter: {
                name: $('#nameInput').val()
            },
            projectionFilters: {
                name: filter.name,
                weight: filter.weight
            }
        }

        const res = await axios.post('http://localhost:3000/search', query)

        $("#searchResults").empty();
        $("#searchResults").html(JSON.stringify(res.data));
    });

    $('#weightSearchButton').click(async () => {
        const query = {
            type: 'weightSearch',
            filter: {
                weight: {
                    $gte: parseInt($('#lowerLimitInput').val()),
                    $lte: parseInt($('#higherLimitInput').val())
                }
            },
            projectionFilters: {
                name: filter.name,
                weight: filter.weight
            }
        }

        const res = await axios.post('http://localhost:3000/search', query)

        $("#searchResults").empty();
        $("#searchResults").html(JSON.stringify(res.data));
    });

    $('#foodSearchButton').click(async () => {
        const foodList = [];
        if ($('#appleCheckbox').is(':checked')) {
            foodList.push('apple');
        }
        if ($('#carrotCheckbox').is(':checked')) {
            foodList.push('carrot');
        }
        const query = {
            type: 'foodSearch',
            filter: {
                food: {
                    $in: foodList
                }
            },
            projectionFilters: {
                name: filter.name,
                weight: filter.weight,
                loves: true
            }
        }
        const res = await axios.post('http://localhost:3000/search', query)
        $("#searchResults").empty();
        $("#searchResults").html(JSON.stringify(res.data));
    });


};

$(document).ready(setup);
