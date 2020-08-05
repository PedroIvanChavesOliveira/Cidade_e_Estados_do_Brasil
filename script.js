import { promises as fs } from 'fs';

creatingJsonUF();
howMuchCities();
bigCityNameTotal();
biggerCityNameForState();

async function biggerCityNameForState() {
  try {
    //EX 5
    let eachState = [];
    let arrayLength = [];
    const jsonAllStates = JSON.parse(await fs.readFile('./Estados.json'));

    for (let i = 0; i < jsonAllStates.length; i++) {
      const jsonData = JSON.parse(
        await fs.readFile(`./estados-json/${jsonAllStates[i].Sigla}.json`)
      );
      jsonData.forEach((item) => {
        eachState.push({ nome: item.cidade.Nome, UF: item.UF });
      });
      arrayLength.push(jsonData.length);
    }

    let summary = 0;
    let aux = 0;
    let newArray = [];
    let newArray2 = [];
    let smallerArray = [];
    let biggestArray = [];

    for (let w = 0; w < arrayLength.length; w++) {
      aux += arrayLength[w];

      if (eachState.indexOf(eachState[w]) < arrayLength[w]) {
        newArray.push(eachState.slice(summary, aux));
      } else {
        newArray.push(eachState.slice(summary, aux));
      }
      summary += arrayLength[w];
    }
    newArray2 = [...newArray];

    newArray.forEach((alfabetic) => {
      alfabetic.sort((a, b) => {
        if (a.nome < b.nome) {
          return 1;
        } else {
          return -1;
        }
      });
    });
    newArray.forEach((size) => {
      size.sort((a, b) => {
        return a.nome.length - b.nome.length;
      });
      smallerArray.push(size[0]);
    });
    console.log(smallerArray);

    // EX 6
    newArray2.forEach((orginized) => {
      orginized.sort((a, b) => {
        if (a.nome > b.nome) {
          return 1;
        } else {
          return -1;
        }
      });
    });
    newArray2.reverse();
    newArray2.forEach((size) => {
      size.sort((a, b) => {
        return b.nome.length - a.nome.length;
      });
      biggestArray.push(size[0]);
    });
    console.log(biggestArray);
  } catch (error) {
    console.log(error);
  }
}

async function bigCityNameTotal() {
  try {
    // EX 7
    let biggerCityName = [];
    let smallerCityName = [];
    let allStatesArray = [];
    const jsonAllStates = JSON.parse(await fs.readFile('./Estados.json'));
    for (let i = 0; i < jsonAllStates.length; i++) {
      const jsonStates = JSON.parse(
        await fs.readFile(`./estados-json/${jsonAllStates[i].Sigla}.json`)
      );
      jsonStates.forEach((item) => {
        allStatesArray.push({ nome: item.cidade.Nome, estado: item.UF });
      });
    }
    allStatesArray.sort((a, b) => {
      return b.nome.length - a.nome.length;
    });
    biggerCityName = allStatesArray[0];
    console.log(biggerCityName);

    // EX 8
    smallerCityName = allStatesArray;

    smallerCityName.sort((a, b) => {
      if (a.nome > b.nome) {
        return 1;
      } else {
        return -1;
      }
      return 0;
    });
    smallerCityName.sort((a, b) => {
      return a.nome.length - b.nome.length;
    });

    console.log(smallerCityName[0]);
  } catch (error) {
    console.log(error);
  }
}

async function howMuchCities() {
  try {
    const jsonUF = JSON.parse(await fs.readFile('./Estados.json'));
    let arrayWithMoreCities = [];
    let arrayWithLessCities = [];
    let totalArray = [];

    // EX 2
    for (let i = 0; i < jsonUF.length; i++) {
      const uf = JSON.parse(
        await fs.readFile(`./estados-json/${jsonUF[i].Sigla}.json`)
      );
      totalArray.push({ nDeCidades: uf.length, UF: jsonUF[i].Sigla });
    }
    console.log(totalArray);

    arrayWithLessCities = [...totalArray];
    arrayWithMoreCities = [...totalArray];
    // EX 3
    arrayWithLessCities.forEach(() => {
      arrayWithLessCities.sort((a, b) => {
        return a.nDeCidades - b.nDeCidades;
      });
    });
    arrayWithLessCities = arrayWithLessCities.slice(0, 5);
    arrayWithLessCities.reverse();

    console.log(arrayWithLessCities);

    // EX 4
    arrayWithMoreCities.forEach(() => {
      arrayWithMoreCities.sort((a, b) => {
        return b.nDeCidades - a.nDeCidades;
      });
    });
    arrayWithMoreCities = arrayWithMoreCities.slice(0, 5);
    console.log(arrayWithMoreCities);
  } catch (error) {
    console.log(error);
  }
}

async function creatingJsonUF() {
  try {
    const jsonCities = JSON.parse(await fs.readFile('./Cidades.json'));
    const jsonUF = JSON.parse(await fs.readFile('./Estados.json'));

    let arrayCompleted = [];
    for (let i = 0; i < jsonUF.length; i++) {
      for (let w = 0; w < jsonCities.length; w++) {
        if (jsonCities[w].Estado === jsonUF[i].ID) {
          arrayCompleted.push({ cidade: jsonCities[w], UF: jsonUF[i].Sigla });
        }
      }
      fs.writeFile(
        `./estados-json/${jsonUF[i].Sigla}.json`,
        JSON.stringify(arrayCompleted, null, 2)
      );
      arrayCompleted = [];
    }
  } catch (error) {
    console.log(error);
  }
}
