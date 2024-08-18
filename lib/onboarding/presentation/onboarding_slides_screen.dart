import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class OnboardingSlidesScreen extends StatefulWidget {
  const OnboardingSlidesScreen({super.key});

  @override
  State<OnboardingSlidesScreen> createState() => _OnboardingSlidesScreenState();
}

class _OnboardingSlidesScreenState extends State<OnboardingSlidesScreen>
    with SingleTickerProviderStateMixin {
  int _currentPage = 0;
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );
    _animation = CurvedAnimation(parent: _controller, curve: Curves.easeInOut);
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _nextPage() {
    setState(() {
      if (_currentPage < 2) {
        _currentPage++;
      } else {
        context.go('/auth');
      }
      _controller.forward(from: 0.0);
    });
  }

  @override
  Widget build(BuildContext context) {
    final color = Theme.of(context).colorScheme;
    return Scaffold(
      body: Stack(
        children: [
          Container(
            color: color.surface,
            child: Column(
              children: [
                if (_currentPage != 0) buildTextContainer(),
                Expanded(child: Container()),
              ],
            ),
          ),
          AnimatedPositioned(
            duration: const Duration(milliseconds: 500),
            top: _currentPage == 0 ? 0 : 240,
            left: 0,
            right: 0,
            height: MediaQuery.of(context).size.height,
            child: ClipRRect(
              borderRadius: _currentPage != 0
                  ? const BorderRadius.vertical(top: Radius.circular(32))
                  : const BorderRadius.vertical(top: Radius.zero),
              child: Container(
                color: color.primary,
                child: FadeTransition(
                  opacity: _animation,
                  child: Stack(
                    children: [
                      buildSlideContent(),
                      if (_currentPage == 0)
                        Positioned(
                          bottom: 32,
                          left: 0,
                          right: 0,
                          child: Column(
                            children: [
                              Padding(
                                padding: const EdgeInsets.all(32),
                                child: Align(
                                  alignment: Alignment.center,
                                  child: SizedBox(
                                    width: double.infinity,
                                    height: 300,
                                    child: Image.asset(
                                      'assets/onboard/onboard-1.png',
                                      fit: BoxFit.contain,
                                    ),
                                  ),
                                ),
                              ),
                              const SizedBox(height: 200),
                            ],
                          ),
                        ),
                    ],
                  ),
                ),
              ),
            ),
          ),
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: Column(
              children: [
                buildPageIndicator(),
                buildNextButton(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget buildSlideContent() {
    if (_currentPage == 0) {
      return buildFirstSlideContent();
    } else {
      return buildOtherSlidesContent();
    }
  }

  Widget buildFirstSlideContent() {
    final color = Theme.of(context).colorScheme;
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 32.0, vertical: 75.0),
          child: buildText(
            'We all got no time to make notes of each and every Subject',
            color.surface,
          ),
        ),
        const Spacer(),
        const SizedBox(height: 16),
      ],
    );
  }

  Widget buildOtherSlidesContent() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        Flexible(
          child: Padding(
            padding: const EdgeInsets.all(50),
            child: Align(
              alignment: Alignment.center,
              child: SizedBox(
                width: double.infinity,
                height: 300,
                child: Image.asset(
                  _currentPage == 1
                      ? 'assets/onboard/onboard-2.png'
                      : 'assets/onboard/onboard-3.png',
                  fit: BoxFit.contain,
                ),
              ),
            ),
          ),
        ),
        const SizedBox(height: 400),
      ],
    );
  }

  Widget buildTextContainer() {
    switch (_currentPage) {
      case 1:
        return buildTextSection(
          'Sell Your Hardwork Handwritten Notes',
          true,
        );
      case 2:
        return buildTextSection(
          'Buy Notes and Excel Exams',
          true,
        );
      default:
        return buildTextSection(
          'We all got no time to make notes of each and every Subject',
          false,
        );
    }
  }

  Widget buildTextSection(String text, bool isTextOnWhiteBackground) {
    final color = Theme.of(context).colorScheme;
    return Container(
      color: color.surface,
      width: double.infinity,
      height: 260,
      padding: const EdgeInsets.symmetric(
        horizontal: 32.0,
        vertical: 62,
      ),
      child: buildText(
        text,
        color.primary,
      ),
    );
  }

  Widget buildText(String text, Color color) {
    return Text(
      text,
      style: TextStyle(
        color: color,
        fontSize: 32,
        fontWeight: FontWeight.w600,
      ),
      textAlign: TextAlign.center,
    );
  }

  Widget buildPageIndicator() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: List.generate(3, (index) => buildIndicator(index)),
      ),
    );
  }

  Widget buildIndicator(int pageIndex) {
    final color = Theme.of(context).colorScheme;
    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      margin: const EdgeInsets.symmetric(horizontal: 4.0),
      width: _currentPage == pageIndex ? 45 : 20,
      height: 8.0,
      decoration: BoxDecoration(
        color: _currentPage == pageIndex ? color.secondary : color.surface,
        borderRadius: BorderRadius.circular(12.0),
      ),
    );
  }

  Widget buildNextButton() {
    final color = Theme.of(context).colorScheme;
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 25, horizontal: 70),
      child: ElevatedButton(
        onPressed: _nextPage,
        style: ElevatedButton.styleFrom(
          minimumSize: const Size(263, 60),
          padding: const EdgeInsets.symmetric(vertical: 18, horizontal: 24),
          backgroundColor: color.secondary,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
          ),
        ),
        child: Text(
          'Next',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.w600,
            color: color.surface,
          ),
        ),
      ),
    );
  }
}
