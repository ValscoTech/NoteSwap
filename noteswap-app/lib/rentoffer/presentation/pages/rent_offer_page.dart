import 'package:flutter/material.dart';
import 'package:noteswap/postoffer/domain/notes_model.dart';
import 'package:noteswap/rentoffer/domain/dummy.dart';
import 'package:noteswap/rentoffer/presentation/widgets/rent_card.dart';

class RentOfferPage extends StatefulWidget {
  const RentOfferPage({super.key});

  @override
  State<RentOfferPage> createState() => _RentOfferPageState();
}

class _RentOfferPageState extends State<RentOfferPage> {
  final List<NotesModel> rentOffers = getDummyNotes();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
        padding: EdgeInsets.all(16.0),
        child: ListView.builder(
          shrinkWrap: true,
          physics: NeverScrollableScrollPhysics(),
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
