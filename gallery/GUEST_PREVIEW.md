# Personalized collection previews

The collection now opens every theme with an explicit sample recipient (`g=Kiran Garu`, `party=family`). An explicit `g` and valid `party` on the collection URL are preserved instead. Image URLs remain unchanged.

This is a collection-demo default only. A standalone invitation without guest data still uses its generic salutation; no recipient is fabricated by the invitation runtime. Production invitation links must carry or resolve the intended recipient data.

`node tools/check-recipient-openings.mjs` checks all thirteen theme links, explicit guest/party preservation, the guest-first type hierarchy across phone/tablet/desktop/landscape, and long English/Telugu names. Results are in `guest-preview-report.txt` and each theme's `opening-report.txt`.
