//package com.tathyfestas.config;
//
//import com.tathyfestas.model.Cliente;
//import org.apache.pdfbox.pdmodel.PDDocument;
//import org.apache.pdfbox.pdmodel.PDPage;
//import org.apache.pdfbox.pdmodel.PDPageContentStream;
//import org.apache.pdfbox.pdmodel.font.PDType1Font;
//
//import java.io.IOException;
//
//public class PDFContractGenerator {
//    public void generateContract(Cliente cliente, String filePath) throws IOException {
//        try (PDDocument document = new PDDocument()) {
//            PDPage page = new PDPage();
//            document.addPage(page);
//
//            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
//                contentStream.beginText();
//                contentStream.setFont(PDType1Font.HELVETICA, 12);
//                contentStream.newLineAtOffset(100, 700); // Posição do primeiro campo de texto
//
//                // Escreva os dados do cliente nos campos de texto do PDF
//                contentStream.showText("Nome Completo: " + cliente.getNomeCompleto());
//                contentStream.newLine();
//                contentStream.showText("CPF: " + cliente.getCpf());
//                contentStream.newLine();
//                contentStream.showText("Endereço: " + cliente.getEndereco());
//                // Continue preenchendo os campos conforme necessário
//
//                contentStream.endText();
//            }
//
//            document.save(filePath);
//        }
//    }
//}
