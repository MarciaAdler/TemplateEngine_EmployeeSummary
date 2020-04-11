# TemplateEngine_EmployeeSummary

## User Story

As a manager
I want to generate a webpage that displays my team's basic info
so that I have quick access to emails and GitHub profiles

## Business Context

It is helpful to be able to create and view a team roster to have easy access to necessary information for team members based on their roles.

## Minimum Requirements

- Functional application.

- GitHub repository with a unique name and a README describing the project.

- User can use the CLI to generate an HTML page that displays information about their team.

- All tests must pass.

## How to use the application

- After cloning the github code and opening, run an npm install to install the following npm packages:
    <ul>
    <li>Dependencies</li>
        <ul>
        <li>inquirer</li>
        <li>util</li>
        <li>minimilist</li>
        </ul>
    <li>DevDependencies</li>
        <ul>
        <li>jest</li>
        <li>minimilist</li>
        </ul>
    </ul>
- Once all the npm packages are installed, in the terminal run node index to run the application in the terminal.
- After answering all the questions for each member of your team, select print team when asked "what team member do you want to add", this will print the information to an HTML file in the output folder. You can then open the team.html file in your browswer to view your employee summary.

![Template Engine Gif](./TemplateEngine-gif.gif)
