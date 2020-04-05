// Name Input
var name = prompt("Enter your name: ");

// Age Input and Validation
while (age === undefined)
{
  var age = prompt("Enter your age: ");
  age = parseInt(age, 10);

  if (isNaN(age)) {
      alert("Age entered was not a valid number.");
      age = undefined;
  }
}

if (age > 0 && age < 49)
{
    alert("Hello " + name + ". You are " + age + ". You're still young!");
}
else if (age > 50)
{
    alert("Hello " + name + ". You are " + age + ". Dang! You're Old!");
}
else
{
    alert("Hello future " + name + ".\nI see that you don't exist yet. Sure thought that one through.")
}


