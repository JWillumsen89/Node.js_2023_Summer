# Store original values
$path = ".\client\src\components\Urls.js"
$envPath = ".\server\.env"
$originalUrlsText = Get-Content $path
$originalEnvText = Get-Content $envPath

# Change the BaseURL in Urls.js
$newUrlsText = $originalUrlsText -replace 'export const BaseURL = .*;', 'export const BaseURL = "http://192.168.1.10:3500";'
Set-Content $path $newUrlsText

# Update the port in the server's .env file
$newEnvText = $originalEnvText -replace 'PORT=.*', 'PORT=3500'
Set-Content $envPath $newEnvText

# Start the client and server
$clientProcess = Start-Process -PassThru -NoNewWindow -FilePath "npm" -ArgumentList "run", "dev", "--", "--host" -WorkingDirectory ".\client"
$serverProcess = Start-Process -PassThru -NoNewWindow -FilePath "nodemon.cmd" -ArgumentList "app.js" -WorkingDirectory ".\server"

# Wait for user input to stop
Read-Host "Press Enter to stop the client and server and revert changes"

# Revert the changes
Set-Content $path $originalUrlsText
Set-Content $envPath $originalEnvText

# Stop the processes
Stop-Process -Id $clientProcess.Id
Stop-Process -Id $serverProcess.Id
