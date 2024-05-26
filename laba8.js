class Employee {
    constructor(firstName, lastName, baseSalary, experience) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.baseSalary = baseSalary;
        this.experience = experience;
    }

    calculateBaseSalary() {
        if (this.experience > 5) {
            return this.baseSalary * 1.2 + 500;
        } else if (this.experience > 2) {
            return this.baseSalary + 200;
        } else {
            return this.baseSalary;
        }
    }

    getSalary() {
        return this.calculateBaseSalary();
    }
}

class Developer extends Employee {
    constructor(firstName, lastName, baseSalary, experience) {
        super(firstName, lastName, baseSalary, experience);
    }
}

class Designer extends Employee {
    constructor(firstName, lastName, baseSalary, experience, effCoeff) {
        super(firstName, lastName, baseSalary, experience);
        this.effCoeff = effCoeff;
    }

    getSalary() {
        return super.getSalary() * this.effCoeff;
    }
}

class Manager extends Employee {
    constructor(firstName, lastName, baseSalary, experience, team = []) {
        super(firstName, lastName, baseSalary, experience);
        this.team = team;
    }

    getSalary() {
        let baseSalary = super.getSalary();
        if (this.team.length > 10) {
            baseSalary += 300;
        } else if (this.team.length > 5) {
            baseSalary += 200;
        }

        let developerCount = this.team.filter(member => member instanceof Developer).length;
        if (developerCount > this.team.length / 2) {
            baseSalary *= 1.1;
        }

        return baseSalary;
    }
}

class Department {
    constructor(managers = []) {
        this.managers = managers;
    }

    giveSalary() {
        const allEmployees = [];

        this.managers.forEach(manager => {
            allEmployees.push(manager);
            allEmployees.push(...manager.team);
        });

        allEmployees.forEach(employee => {
            console.log(`${employee.firstName} ${employee.lastName} отримав ${employee.getSalary().toFixed(2)} шекелів`);
        });
    }
}

const dev1 = new Developer('Іван', 'Іванов', 1000, 3);
const dev2 = new Developer('Петро', 'Петров', 1200, 6);
const designer1 = new Designer('Марія', 'Володимирiвна', 1500, 4, 0.9);
const designer2 = new Designer('Анна', 'Володимирiвна', 1600, 1, 0.8);
const manager1 = new Manager('Микола', 'Миколайович', 2000, 5, [dev1, dev2, designer1, designer2]);

const dev3 = new Developer('Олег', 'Олегович', 1100, 2);
const dev4 = new Developer('Сергій', 'Сергійович', 1300, 7);
const designer3 = new Designer('Ольга', 'Максимiвна', 1400, 6, 0.95);
const manager2 = new Manager('Ірина', 'Іванівна', 2100, 8, [dev3, dev4, designer3]);

const department = new Department([manager1, manager2]);

department.giveSalary();
