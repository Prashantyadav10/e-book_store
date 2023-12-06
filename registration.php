<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve user input
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Hash and salt the password

    // Validation and database integration steps would go here in a real application

    // For simplicity, we'll just display a success message
    echo "Registration successful. <a href='login.html'>Login here</a>";
}
?>
