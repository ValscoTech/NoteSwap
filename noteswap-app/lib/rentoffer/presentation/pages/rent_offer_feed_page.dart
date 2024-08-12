import 'package:flutter/material.dart';
import 'package:noteswap/postoffer/domain/notes_model.dart';
import 'package:noteswap/rentoffer/domain/dummy.dart';
import 'package:noteswap/rentoffer/presentation/widgets/rent_card.dart';

class RentOfferFeedPage extends StatefulWidget {
  const RentOfferFeedPage({super.key});

  @override
  State<RentOfferFeedPage> createState() => _RentOfferFeedPageState();
}

class _RentOfferFeedPageState extends State<RentOfferFeedPage> {
  final List<NotesModel> rentOffers = getDummyNotes();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
        padding: const EdgeInsets.all(16.0),
        child: ListView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: rentOffers.length,
          itemBuilder: (context, index) {
            final rentOffer = rentOffers[index];
            return RentCard(notes: rentOffer);
          },
        ),
      ),
    );
  }
}
