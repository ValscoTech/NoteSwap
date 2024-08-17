import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:noteswap/postoffer/domain/notes_model.dart';
import 'package:noteswap/rentoffer/presentation/pages/rent_offer_page.dart';

class RentCard extends StatefulWidget {
  final NotesModel notes;

  const RentCard({super.key, required this.notes});

  @override
  State<RentCard> createState() => _RentCardState();
}

class _RentCardState extends State<RentCard> {
  bool isExpanded = false;
  @override
  Widget build(BuildContext context) {
    final color = Theme.of(context).colorScheme;
    final layout = MediaQuery.of(context).size;
    return GestureDetector(
      onTap: () {
        setState(() {
          isExpanded = !isExpanded;
        });
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: color.surface,
          borderRadius: BorderRadius.circular(15),
        ),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
          decoration: BoxDecoration(
            color: color.primary,
            borderRadius: BorderRadius.circular(15),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Column(
                    children: [
                      Row(
                        children: [
                          Text(
                            widget.notes.courseCode,
                            style: TextStyle(
                              color: color.surface,
                              fontSize: 13,
                              fontWeight: FontWeight.w400,
                            ),
                          ),
                          SizedBox(width: layout.width * 0.01),
                          SvgPicture.asset(
                              'assets/school/${widget.notes.school}.svg'),
                        ],
                      ),
                      SizedBox(
                        width: layout.width * 0.3,
                        child: Text(
                          widget.notes.courseName,
                          style: TextStyle(
                            color: color.surface,
                            fontSize: 17,
                            fontWeight: FontWeight.w400,
                          ),
                          maxLines: 3,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                  const Spacer(),
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                    decoration: BoxDecoration(
                      color: color.surface,
                      borderRadius: BorderRadius.circular(15),
                    ),
                    child: Row(
                      children: [
                        Column(
                          children: [
                            Text(
                              'Modules',
                              style: TextStyle(
                                color: color.primary,
                                fontSize: 17,
                                fontWeight: FontWeight.w400,
                              ),
                            ),
                            Text(
                              'Covered',
                              style: TextStyle(
                                color: color.primary,
                                fontSize: 17,
                                fontWeight: FontWeight.w400,
                              ),
                            ),
                          ],
                        ),
                        SizedBox(width: layout.width * 0.05),
                        Text(
                          widget.notes.modules.length.toString(),
                          style: TextStyle(
                            color: color.primary,
                            fontSize: 41,
                            fontWeight: FontWeight.normal,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              SizedBox(height: layout.height * 0.02),
              Container(
                height: layout.height * 0.25,
                decoration: BoxDecoration(
                  color: color.surface,
                  borderRadius: BorderRadius.circular(15),
                ),
              ),
              if (isExpanded) ...[
                const SizedBox(height: 10),
                Text(
                  'Offered By',
                  style: TextStyle(
                    color: color.surface,
                    fontSize: 17,
                    fontWeight: FontWeight.w400,
                  ),
                ),
                Divider(color: color.surface),
                Text(
                  'Price: ${widget.notes.price} Rs',
                  style: TextStyle(
                    color: color.surface,
                    fontSize: 17,
                    fontWeight: FontWeight.w400,
                  ),
                ),
                const SizedBox(height: 10),
                Center(
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      minimumSize: const Size(240, 60),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(15),
                      ),
                    ),
                    onPressed: () {
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (context) =>
                              RentOfferPage(notes: widget.notes),
                        ),
                      );
                    },
                    child: Text(
                      'Rent Notes',
                      style: TextStyle(
                        color: color.primary,
                        fontSize: 17,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
