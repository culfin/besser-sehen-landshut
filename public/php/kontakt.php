<?php
/*
Name: 			Contact Form - Honeypot + Time Validation
Written by: 	Claude Code (Modified from Porto Template)
Theme Version:	8.0.0
Anti-Spam:		Honeypot + Time Validation (No Google reCAPTCHA)
*/

namespace PortoContactForm;

ini_set('allow_url_fopen', true);

session_cache_limiter('nocache');
header('Expires: ' . gmdate('r', 0));

header('Content-type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'php-mailer/src/PHPMailer.php';
require 'php-mailer/src/SMTP.php';
require 'php-mailer/src/Exception.php';

// Anti-Spam Validation
$spamDetected = false;
$spamReason = '';

// 1. Honeypot Check - "website" field must be empty
if (isset($_POST['website']) && !empty($_POST['website'])) {
	$spamDetected = true;
	$spamReason = 'Honeypot filled';

	// Log spam attempt (optional - für Debugging)
	error_log('Spam detected: Honeypot filled - IP: ' . $_SERVER['REMOTE_ADDR']);
}

// 2. Time Validation - Form must be filled for at least 3 seconds
if (!$spamDetected && isset($_POST['form_timestamp'])) {
	$timestamp = intval($_POST['form_timestamp']);
	$currentTime = round(microtime(true) * 1000); // milliseconds
	$timeDiff = $currentTime - $timestamp;

	// Minimum 3 seconds (3000 milliseconds)
	if ($timeDiff < 3000) {
		$spamDetected = true;
		$spamReason = 'Form submitted too fast (' . $timeDiff . 'ms)';

		error_log('Spam detected: Too fast - IP: ' . $_SERVER['REMOTE_ADDR'] . ' - Time: ' . $timeDiff . 'ms');
	}

	// Maximum 1 hour (prevent token reuse)
	if ($timeDiff > 3600000) {
		$spamDetected = true;
		$spamReason = 'Form token expired';
	}
}

// 3. Check if timestamp exists
if (!$spamDetected && !isset($_POST['form_timestamp'])) {
	$spamDetected = true;
	$spamReason = 'Missing timestamp';
}

// If spam detected, return error
if ($spamDetected) {
	$arrResult = array(
		'response' => 'error',
		'errorMessage' => 'Ihre Nachricht wurde als Spam erkannt. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.'
	);
	echo json_encode($arrResult);
	exit;
}

// Proceed with sending email if no spam detected
// Step 1 - Email address
$email = 'hallo@bessersehen.la';

// If the e-mail is not working, change the debug option to 2 | $debug = 2;
$debug = 0;

// Subject
$subject = (isset($_POST['betreff']) && !empty($_POST['betreff']))
	? $_POST['betreff']
	: 'Besser Sehen Landshut - Kontaktformular';

$message = '';

foreach($_POST as $label => $value) {
	// Skip anti-spam fields
	if (in_array($label, array('website', 'form_timestamp', 'g-recaptcha-response'))) {
		continue;
	}

	$label = ucwords($label);

	// German field names
	$fieldTranslations = array(
		'Name' => 'Name',
		'Email' => 'E-Mail',
		'Betreff' => 'Betreff',
		'Message' => 'Nachricht'
	);

	if (isset($fieldTranslations[$label])) {
		$label = $fieldTranslations[$label];
	}

	// Checkboxes
	if (is_array($value)) {
		$value = implode(', ', $value);
	}

	$message .= $label . ": " . htmlspecialchars($value, ENT_QUOTES) . "<br>\n";
}

// Add metadata
$message .= "<br><br>---<br>";
$message .= "Gesendet am: " . date('d.m.Y H:i:s') . "<br>";
$message .= "IP-Adresse: " . $_SERVER['REMOTE_ADDR'] . "<br>";

$mail = new PHPMailer(true);

try {

	$mail->SMTPDebug = $debug;

	// Optional SMTP configuration (uncomment if needed)
	//$mail->IsSMTP();
	//$mail->Host = 'mail.yourserver.com';
	//$mail->SMTPAuth = true;
	//$mail->Username = 'user@example.com';
	//$mail->Password = 'secret';
	//$mail->SMTPSecure = 'tls';
	//$mail->Port = 587;

	$mail->AddAddress($email);

	// From - Name
	$fromName = (isset($_POST['name'])) ? $_POST['name'] : 'Website User';
	$mail->SetFrom($email, $fromName);

	// Reply To
	if (isset($_POST['email'])) {
		$mail->AddReplyTo($_POST['email'], $fromName);
	}

	$mail->IsHTML(true);
	$mail->CharSet = 'UTF-8';

	$mail->Subject = $subject;
	$mail->Body = $message;

	$mail->Send();
	$arrResult = array('response' => 'success');

} catch (Exception $e) {
	$arrResult = array('response' => 'error', 'errorMessage' => $e->errorMessage());
} catch (\Exception $e) {
	$arrResult = array('response' => 'error', 'errorMessage' => $e->getMessage());
}

if ($debug == 0) {
	echo json_encode($arrResult);
}
