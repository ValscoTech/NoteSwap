import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: PaymentScreen(),
    );
  }
}

class PaymentScreen extends StatefulWidget {
  const PaymentScreen({super.key});

  @override
  State<PaymentScreen> createState() => _PaymentScreenState();
}

class _PaymentScreenState extends State<PaymentScreen> {
  String _paymentMethod = '';
  final PageController _pageController = PageController();
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              child: Column(
                children: [
                  // Card Details Section
                  Padding(
                    padding: const EdgeInsets.all(20),
                    child: Column(
                      children: [
                        Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            TextButton(
                              onPressed: () {},
                              child: const Text(
                                'Review the Rented notes',
                                style: TextStyle(
                                    color: Colors.black, fontSize: 18),
                              ),
                            ),
                            TextButton(
                              onPressed: () {},
                              child: const Text(
                                '+ add new card',
                                style: TextStyle(
                                    color: Colors.black, fontSize: 18),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        SizedBox(
                          height:
                              250, // Increase the height to make room for the indicator
                          child: Column(
                            children: [
                              Expanded(
                                child: PageView(
                                  controller: _pageController,
                                  onPageChanged: (int index) {
                                    setState(() {
                                      _currentIndex = index;
                                    });
                                  },
                                  children: const [
                                    CreditCard(
                                      creditCardNumber: '1234 5678 9012 3456',
                                      cardHolder: 'Zoro',
                                      expiry: '09/25',
                                    ),
                                    CreditCard(
                                      creditCardNumber: '1234 5678 9012 3456',
                                      cardHolder: 'Zoro',
                                      expiry: '09/25',
                                    ),
                                    CreditCard(
                                      creditCardNumber: '1234 5678 9012 3456',
                                      cardHolder: 'Zoro',
                                      expiry: '09/25',
                                    )
                                  ],
                                ),
                              ),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: List.generate(
                                  3, // Number of pages
                                  (index) => Padding(
                                    padding: const EdgeInsets.all(4.0),
                                    child: CircleAvatar(
                                      radius: 6,
                                      backgroundColor: index == _currentIndex
                                          ? const Color.fromARGB(
                                              255, 116, 116, 116)
                                          : const Color.fromARGB(255, 0, 0, 0),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(
                    height: 30,
                  ),
                  // Other Payment Methods Section
                  Padding(
                    padding: const EdgeInsets.all(30),
                    child: Container(
                      decoration: const BoxDecoration(
                        border: Border(
                          top: BorderSide(
                            color: Colors.black,
                            width: 2,
                          ),
                        ),
                      ),
                      child: Column(
                        children: [
                          const SizedBox(
                            height: 20,
                          ),
                          const Align(
                            alignment: Alignment.centerLeft,
                            child: Text(
                              'Other Payment Methods',
                              style: TextStyle(fontSize: 24),
                            ),
                          ),
                          const SizedBox(height: 10),
                          Row(
                            children: [
                              const Icon(Icons.computer, size: 20),
                              const SizedBox(width: 10),
                              const Text(
                                'UPI',
                                style: TextStyle(fontSize: 16),
                              ),
                              const Spacer(),
                              Radio(
                                value: 'UPI',
                                groupValue: _paymentMethod,
                                onChanged: (value) {
                                  setState(() {
                                    _paymentMethod = value!;
                                  });
                                },
                              ),
                            ],
                          ),
                          Row(
                            children: [
                              const Icon(Icons.computer, size: 20),
                              const SizedBox(width: 10),
                              const Text(
                                'Google Pay',
                                style: TextStyle(fontSize: 16),
                              ),
                              const Spacer(),
                              Radio(
                                value: 'Google Pay',
                                groupValue: _paymentMethod,
                                onChanged: (value) {
                                  setState(() {
                                    _paymentMethod = value!;
                                  });
                                },
                              ),
                            ],
                          ),
                          Row(
                            children: [
                              const Icon(Icons.computer, size: 20),
                              const SizedBox(width: 10),
                              const Text(
                                'PayPal',
                                style: TextStyle(fontSize: 16),
                              ),
                              const Spacer(),
                              Radio(
                                value: 'PayPal',
                                groupValue: _paymentMethod,
                                onChanged: (value) {
                                  setState(() {
                                    _paymentMethod = value!;
                                  });
                                },
                              ),
                            ],
                          ),
                          Row(
                            children: [
                              const Icon(Icons.computer, size: 20),
                              const SizedBox(width: 10),
                              const Text(
                                'Net Banking',
                                style: TextStyle(fontSize: 16),
                              ),
                              const Spacer(),
                              Radio(
                                value: 'Net Banking',
                                groupValue: _paymentMethod,
                                onChanged: (value) {
                                  setState(() {
                                    _paymentMethod = value!;
                                  });
                                },
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          // Order Summary Section
          Container(
            decoration: const BoxDecoration(
              color: Colors.black,
            ),
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Plan',
                        style: TextStyle(color: Colors.white),
                      ),
                      Text(
                        '\$100',
                        style: TextStyle(color: Colors.white),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Our Cut',
                        style: TextStyle(color: Colors.white),
                      ),
                      Text(
                        '\$10',
                        style: TextStyle(color: Colors.white),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Summary',
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: 20,
                            fontWeight: FontWeight.bold),
                      ),
                      Text(
                        '\$110',
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: 20,
                            fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      minimumSize:
                          Size(MediaQuery.of(context).size.width - 40, 50),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(
                            10), // Change this value to your desired radius
                      ),
                    ),
                    onPressed: () {
                      // Add payment processing logic here
                    },
                    child: const Text(
                      'PAY NOW',
                      style: TextStyle(color: Colors.black, fontSize: 20),
                    ),
                  )
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}

class CreditCard extends StatefulWidget {
  final String creditCardNumber;
  final String cardHolder;
  final String expiry;

  const CreditCard({
    super.key,
    required this.creditCardNumber,
    required this.cardHolder,
    required this.expiry,
  });

  @override
  State<CreditCard> createState() => _CreditCardState();
}

class _CreditCardState extends State<CreditCard> {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 250,
      margin: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(30),
        color: const Color.fromARGB(255, 11, 17, 73),
      ),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Icon(Icons.security, color: Colors.white, size: 20),
                const Icon(Icons.more_vert, color: Colors.white, size: 20),
              ],
            ),
            const SizedBox(
                height:
                    10), // Add a small spacing between icons and card number
            Center(
              child: Text(
                widget.creditCardNumber,
                style: const TextStyle(fontSize: 30, color: Colors.white),
              ),
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text("Card Holder",
                        style: TextStyle(color: Colors.grey, fontSize: 18)),
                    Text(widget.cardHolder,
                        style:
                            const TextStyle(color: Colors.white, fontSize: 20)),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text("Expiry",
                        style: TextStyle(color: Colors.grey, fontSize: 18)),
                    Text(widget.expiry,
                        style:
                            const TextStyle(color: Colors.white, fontSize: 20)),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
