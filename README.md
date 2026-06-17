# Κοινωνική Νόηση

Static study site and Word downloads for the course material.

## Περιεχόμενο

- `topics/`: οι 7 θεματικές ενότητες.
- `exam/multiple-choice.html`: όλες οι ερωτήσεις πολλαπλής επιλογής ανά θεματική.
- `downloads/`: Word σημειώσεις και συγκεντρωτικό quiz.
- `tools/build_site.py`: deterministic builder από τα PowerPoint και τα χειροποίητα study δεδομένα.

## Rebuild

Run with the bundled or any Python that has `python-docx` and `pypdf` available:

```powershell
python tools/build_site.py
```

Τα πρωτογενή PowerPoint/PDF μένουν τοπικά και αγνοούνται από git για μέγεθος και δικαιώματα χρήσης.
