<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blackjack</title>
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="background"></div>
    <div class="container">
        <form action="authorize-login.php" method="post" class="login-form">
            <h2>Login</h2>
            <?php if(isset($_GET['error'])){ ?>
                <p class="error-message"><?php echo htmlspecialchars($_GET['error']); ?></p>
            <?php } ?>
            <div class="input-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="input-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit">Login</button>
            <p>Don't have an account? <a href="signup.php">Sign up here</a></p>
        </form>
    </div>
</body>
</html>