# Regenerates liturgy-data.js from liturgy/*.txt (UTF-8, sans BOM)
Set-Location $PSScriptRoot
Add-Type -AssemblyName System.Web.Extensions
$js = New-Object System.Web.Script.Serialization.JavaScriptSerializer
$js.MaxJsonLength = 50000000
$keys = @('intro','ordre','niveau1','niveau23','partie1','partie2','partie3','partie4','partie5','annexes')
$utf8 = New-Object System.Text.UTF8Encoding $false
$sb = New-Object System.Text.StringBuilder
$null = $sb.Append("window.liturgySections = {`n")
for ($i = 0; $i -lt $keys.Length; $i++) {
  $k = $keys[$i]
  $raw = [System.IO.File]::ReadAllText((Join-Path $PSScriptRoot "liturgy\$k.txt"), $utf8)
  $escaped = $js.Serialize($raw)
  if ($i -gt 0) { $null = $sb.Append(",`n") }
  $null = $sb.Append("`"$k`": ")
  $null = $sb.Append($escaped)
}
$null = $sb.Append("`n};`n")
[System.IO.File]::WriteAllText((Join-Path $PSScriptRoot 'liturgy-data.js'), $sb.ToString(), $utf8)
Write-Host "OK liturgy-data.js"
