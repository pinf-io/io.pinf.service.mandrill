
require('org.pinf.genesis.lib/lib/api').forModule(require, module, function (API, exports) {

	var Send = function () {
		var self = this;

		self.$PLComponent = "io.pinf.service.mandrill/send/0";

		self.sendMessage = function (messageOverrides) {
			return API.Q.denodeify(function (callback) {

				if (self.enabled === false) {
					API.console.debug("Skip sending mandrill email message due to 'enabled === false'");
					return callback(null);
				}

//console.log("Send Mandrill Message:");

				API.ASSERT(typeof self.profile.apiKey, "string");

				var client = new API.MANDRILL.Mandrill(self.profile.apiKey);

				var defaultMessage = API.DEEPMERGE({
//				    "html": "<p>Example HTML content</p>",
				    "text": "Example text content",
				    "subject": "example subject",
				    "from_email": "message.from_email@example.com",
				    "from_name": "Example Name",
			        "to": [
//				        {
//				            "email": "recipient.email@example.com",
//				            "name": "Recipient Name",
//				            "type": "to"
//				        }
				    ],
//				    "headers": {
//				        "Reply-To": "message.reply@example.com"
//				    },
				    "important": false,
				    "track_opens": null,
				    "track_clicks": null,
				    "auto_text": null,
				    "auto_html": null,
				    "inline_css": null,
				    "url_strip_qs": null,
				    "preserve_recipients": null,
				    "view_content_link": null,
//				    "bcc_address": "message.bcc_address@example.com",
				    "tracking_domain": null,
				    "signing_domain": null,
				    "return_path_domain": null,
				    "merge": true,
//				    "merge_language": "mailchimp",
//				    "global_merge_vars": [{
//				            "name": "merge1",
//				            "content": "merge1 content"
//				        }],
//				    "merge_vars": [{
//				            "rcpt": "recipient.email@example.com",
//				            "vars": [{
//				                    "name": "merge2",
//				                    "content": "merge2 content"
//				                }]
//				        }],
//				    "tags": [
//				        "password-resets"
//				    ],
//				    "subaccount": "customer-123",
//				    "google_analytics_domains": [
//				        "example.com"
//				    ],
//				    "google_analytics_campaign": "message.from_email@example.com",
//				    "metadata": {
//				        "website": "www.example.com"
//				    },
//				    "recipient_metadata": [{
//				            "rcpt": "recipient.email@example.com",
//				            "values": {
//				                "user_id": 123456
//				            }
//				        }],
//				    "attachments": [{
//				            "type": "text/plain",
//				            "name": "myfile.txt",
//				            "content": "ZXhhbXBsZSBmaWxl"
//				        }],
//				    "images": [{
//				            "type": "image/png",
//				            "name": "IMAGECID",
//				            "content": "ZXhhbXBsZSBmaWxl"
//				        }]
				}, self.message || {});

				var message = API.DEEPMERGE(defaultMessage, messageOverrides || {});

//console.log("Send message", message);

				return client.messages.send({
					"message": message,
					"async": false,
					"ip_pool": "Main Pool"
				}, function (result) {
				    /*
				    [{
			            "email": "recipient.email@example.com",
			            "status": "sent",
			            "reject_reason": "hard-bounce",
			            "_id": "abc123abc123abc123abc123abc123"
			        }]
				    */

//console.log("Email send result", result);

					return callback(null);

				}, function (err) {

//console.log("Email send error", err.stack);

					return callback(err);
				});
			})();
		}
	}

	exports.PLComponent = function (config, groupConfig) {

		return {
			"$io.pinf.service.mandrill/send/0": API.EXTEND(true, new Send(), config)
		};
	}

});



