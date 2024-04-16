function solve(array) {
    let n = Number(array.shift());
    let baristas = [];

    for (let i = 0; i < n; i++) {
        let line = array.shift().split(' ');

        let obj = {
            name: line[0],
            shift: line[1],
            coffeeTypes: line[2].split(','),
        }
        baristas.push(obj);
    }

    let commandInput = array.shift();
    while (commandInput !== 'Closed') {
        let command = commandInput.split(' / ');
        let action = command[0];
        let baristaName = command[1];
        let barista;

        switch (action) {
            case 'Prepare':
                let shift = command[2];
                let coffeeType = command[3];
                barista = baristas.find(barista => barista.name === baristaName);
                if (barista.shift === shift && barista.coffeeTypes.find(type => type === coffeeType)) {
                    console.log(`${baristaName} has prepared a ${coffeeType} for you!`)
                }
                else {
                    console.log(`${baristaName} is not available to prepare a ${coffeeType}.`)
                }
                break;
            case 'Change Shift':
                let newShift = command[2];
                barista = baristas.find(barista => barista.name === baristaName);
                barista.shift = newShift;
                console.log(`${baristaName} has updated his shift to: ${newShift}`)
                break;
            case 'Learn':
                let newCoffeeType = command[2];
                barista = baristas.find(barista => barista.name === baristaName);
                let type = barista.coffeeTypes.includes(newCoffeeType);
                if (type) {
                    console.log(`${baristaName} knows how to make ${newCoffeeType}.`);
                }
                else {
                    barista.coffeeTypes.push(newCoffeeType);
                    console.log(`${baristaName} has learned a new coffee type: ${newCoffeeType}.`)
                }
                break;
        }
        commandInput = array.shift();
    }

    for (let barista of baristas) {
        console.log(`Barista: ${barista.name}, Shift: ${barista.shift}, Drinks: ${barista.coffeeTypes.join(', ')}`);
    }
}