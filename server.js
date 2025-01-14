const { UDPServer } = require('dns2'); // Import the dns2 package
const dns2 = require('dns2');  // For DNS query parsing and handling

// Create a DNS server
const server = new dns2.Server({
  udp: true,  // Use UDP for DNS queries
  handle: async (request, send) => {
    const { questions } = dns2.Packet.parse(request);  // Parse incoming DNS queries
    const response = dns2.Packet.createResponseFromRequest(request);  // Create a response template

    // Use Google's DNS server (8.8.8.8) to resolve DNS queries
    const googleDns = '8.8.8.8'; // Google's public DNS server

    if (questions.length > 0) {
      const question = questions[0];  // Extract the first DNS query
      const queryName = question.name;  // Get the domain name being queried

      // Send the DNS query to Google's DNS server and get the response
      const result = await dns2.resolve(queryName, googleDns);

      // Add the response from Google DNS to the response packet
      response.answers = result.answers;
    }

    // Send the DNS response back to the client
    send(response);
  }
});

// Start the DNS server on port 53 (default DNS port)
server.listen(53, '0.0.0.0', () => {
  console.log('DNS Proxy running on Fly.io');
});
