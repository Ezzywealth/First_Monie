import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.section}>
        <Text>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos
          ipsum itaque eligendi tempore id veritatis obcaecati totam magnam
          distinctio molestiae adipisci minus doloribus possimus fuga laudantium
          libero nobis ducimus dolore voluptas repellat, recusandae explicabo
          maxime blanditiis velit! Saepe illum voluptate consectetur distinctio
          dolore, fugit magni enim dicta eveniet perspiciatis aperiam sed, error
          optio ut ex reiciendis hic commodi provident cum fugiat omnis, quo
          obcaecati? Debitis, voluptatibus. Fuga dolorum vitae similique vel
          eveniet saepe laborum quos, aliquam repudiandae ex est consequuntur
          eligendi consectetur asperiores! Neque quisquam, doloribus ab
          cupiditate nobis, porro, eligendi sit illo dolore voluptatum dolorum!
          Minus ex vero pariatur sequi nihil explicabo cumque, iste adipisci,
          ullam molestias optio reiciendis, possimus incidunt corrupti itaque
          sunt saepe? Sapiente, voluptates. Veniam, explicabo ex eum hic sequi
          quo delectus voluptatem temporibus odio animi praesentium eaque, sunt
          vel necessitatibus deserunt? Dolore optio esse repudiandae
          reprehenderit hic recusandae possimus magnam nemo dolores nihil,
          temporibus earum ab velit explicabo rerum neque laudantium eligendi
          laboriosam qui voluptatum accusantium iste! Dicta eum animi deleniti
          repellendus quos natus dignissimos sed obcaecati fuga quam iusto error
          quod, consequatur facilis iure placeat molestiae molestias ullam
          laborum? Error hic quas laboriosam nisi tempore consequuntur nostrum
          mollitia similique ipsum voluptas accusamus inventore, nam qui quod
          magni aperiam est quia maxime ad consequatur eligendi? Iste labore
          odit quos modi quae inventore delectus ducimus cumque odio itaque,
          beatae quibusdam dicta? Non cupiditate omnis adipisci consequuntur
          quod velit quos ut sit. Esse distinctio totam dicta repellendus
          aliquid cupiditate labore, eum dignissimos consequatur dolor quis nemo
          necessitatibus, quidem est soluta dolorem accusamus ratione sit
          similique fugiat excepturi molestiae odio laboriosam atque. Illo illum
          accusantium optio aliquam, quibusdam vero ullam possimus tempore
          repudiandae fugiat necessitatibus asperiores. Nisi, sunt ea. Quasi,
          nesciunt! Unde temporibus corporis quas, quibusdam impedit aut maiores
          sapiente accusamus ullam non, excepturi delectus dignissimos deserunt!
          Quidem laborum voluptatem non soluta qui ullam porro? Voluptates
          labore hic, earum possimus, nam explicabo expedita excepturi,
          similique enim asperiores quo facere commodi atque fuga reprehenderit
          eos nemo illum nesciunt? Eius, officiis ipsum quae aliquam id labore
          nostrum architecto accusamus deserunt, quam sed doloribus, quidem sunt
          perferendis error necessitatibus consequatur illo ut laudantium
          repudiandae assumenda placeat autem ipsam cum. Autem maxime nisi
          ducimus mollitia ullam nostrum odio suscipit assumenda, facilis
          numquam consequuntur aspernatur temporibus accusantium, ipsa illo
          corrupti saepe veniam! Dicta voluptates cum odio pariatur cumque
          distinctio doloribus, minima aliquid inventore ut assumenda iste
          laborum sed eaque? Modi ea placeat libero culpa aliquid corrupti,
          debitis quos totam mollitia ullam nihil explicabo molestiae
          consequatur rem voluptas provident doloremque sint, quibusdam ducimus
          laboriosam ipsam laborum magnam fugiat. Amet pariatur accusantium
          reprehenderit ut cumque saepe sint eveniet ipsa ad delectus, adipisci
          voluptate distinctio atque natus eligendi beatae nobis repudiandae ab.
          Culpa a similique veritatis, voluptas repellendus autem omnis vel quam
          eos vitae accusantium voluptates veniam? Iure, adipisci facilis!
          Maiores, laudantium iusto unde asperiores quod suscipit dolore
          distinctio similique. Dolore harum suscipit sequi ipsa distinctio
          nostrum repellat ducimus voluptate quas, beatae quos. Doloremque
          libero, eum veniam inventore nulla ratione nihil! Natus sequi commodi
          aperiam rem!
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages}`}
          fixed
        />
      </View>
    </Page>
  </Document>
);

export default MyDocument;
