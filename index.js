const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString();
let arrayinput = input.split(',').map(str => Number(str));
const IDpart1 = 1;
const IDpart2 = 5;

const calcOpcode = int => {
  let opcode = int.toString();
  opcode = opcode.padStart(4, '0');
  return opcode[2] + opcode[3];
};

const calcListParamModes = int => {
  let listParamModes = [];
  let str = int.toString();
  const completeOpcode = str.padStart(4, '0');

  for (let index = 0; index < completeOpcode.length - 2; index++) {
    listParamModes.push(Number(completeOpcode[index]));
  }

  return listParamModes;
};

const calcParam = (arrayProgram, index, param, paramMode) => {
  let result = 0;

  if (paramMode === 0) {
    result = arrayProgram[index + param];
  } else {
    result = index + param;
  }

  return result;
};

const calcDiagnosticCode = (array, inputNumber) => {
  let arrayProgram = [...array];
  let index = 0;

  while (index < array.length) {
    const opcode = calcOpcode(arrayProgram[index]);
    let listParamModes = calcListParamModes(arrayProgram[index]);
    let param1 = calcParam(arrayProgram, index, 1, listParamModes[1]);
    let param2 = calcParam(arrayProgram, index, 2, listParamModes[0]);
    let param3 = calcParam(arrayProgram, index, 3, 0);

    switch (opcode) {
      case '01':
        arrayProgram[param3] = arrayProgram[param1] + arrayProgram[param2];
        index += 4;
        break;
      case '02':
        arrayProgram[param3] = arrayProgram[param1] * arrayProgram[param2];
        index += 4;
        break;
      case '03':
        arrayProgram[param1] = inputNumber;
        index += 2;
        break;
      case '04':
        console.log(arrayProgram[param1]);
        index += 2;
        break;
      case '05':
        if (arrayProgram[param1] !== 0) {
          index = arrayProgram[param2];
        } else {
          index += 3;
        }
        break;
      case '06':
        if (arrayProgram[param1] === 0) {
          index = arrayProgram[param2];
        } else {
          index += 3;
        }
        break;
      case '07':
        if (arrayProgram[param1] < arrayProgram[param2]) {
          arrayProgram[param3] = 1;
        } else {
          arrayProgram[param3] = 0;
        }
        index += 4;
        break;
      case '08':
        if (arrayProgram[param1] === arrayProgram[param2]) {
          arrayProgram[param3] = 1;
        } else {
          arrayProgram[param3] = 0;
        }
        index += 4;
        break;
      case '99':
        return '';
      default:
        return console.log(`ERROR: opcode: ${opcode}`);
    }
  }
};

console.time('time part1');
console.log(calcDiagnosticCode(arrayinput, IDpart1));
console.timeEnd('time part1');
console.time('time part2');
console.log(calcDiagnosticCode(arrayinput, IDpart2));
console.timeEnd('time part2');
